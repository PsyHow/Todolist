import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TasksStateType } from 'App';
import {
  addTodolistTC,
  AppRootStateType,
  fetchTodolistTC,
  removeTodolistTC,
  setAppStatusAC,
} from 'bll';
import { INDEX_CHECK, OK_RESULT, SPLICE_ELEMENT } from 'const';
import { todolistAPI, UpdateTaskModelType } from 'dal';
import { TaskStatuses } from 'enums';
import { handleServerAppError, handleServerNetworkError } from 'utils';

const initialState: TasksStateType = {};

// thunks
export const fetchTaskTC = createAsyncThunk(
  'tasks/fetchTasks',
  async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await todolistAPI.getTasks(todolistId);
    const tasks = res.data.items;
    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
    return { tasks, todolistId };
  },
);

export const deleteTaskTC = createAsyncThunk(
  'tasks/deleteTask',
  async (param: { todolistId: string; taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
    await todolistAPI.deleteTask(param.todolistId, param.taskId);
    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
    return { todolistId: param.todolistId, taskId: param.taskId };
  },
);

export const createTaskTC = createAsyncThunk(
  'tasks/createTask',
  async (param: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    try {
      const res = await todolistAPI.createTask(param.todolistId, param.title);
      if (res.data.resultCode === OK_RESULT) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        return res.data.data.item;
      }
      handleServerAppError(dispatch, res.data);
      return rejectWithValue(null);
    } catch (err) {
      handleServerNetworkError(err as Error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const updateTaskTC = createAsyncThunk(
  'tasks/updateTask',
  async (
    param: { todolistId: string; taskId: string; model: UpdateTaskModelType },
    { dispatch, rejectWithValue, getState },
  ) => {
    const state = getState() as AppRootStateType;
    const task = state.tasksReducer[param.todolistId].find(t => t.id === param.taskId);
    if (!task) {
      return rejectWithValue('task not found in the state');
    }
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      status:
        task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New,
      deadline: task.deadline,
      startDate: task.startDate,
      priority: task.priority,
      description: task.description,
      ...param.model,
    };
    const res = await todolistAPI.updateTask(param.todolistId, param.taskId, apiModel);
    try {
      if (res.data.resultCode === OK_RESULT) {
        return param;
      }
      handleServerAppError(dispatch, res.data);
      return rejectWithValue(null);
    } catch (error) {
      handleServerNetworkError(error as Error, dispatch);
      return rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      delete state[action.payload.id];
    });
    builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        // eslint-disable-next-line no-param-reassign
        state[tl.id] = [];
      });
    });
    builder.addCase(fetchTaskTC.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state[action.payload.todolistId] = action.payload.tasks;
    });
    builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index > INDEX_CHECK) {
        tasks.splice(index, SPLICE_ELEMENT);
      }
    });
    builder.addCase(createTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift(action.payload);
    });
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index > INDEX_CHECK) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    });
  },
});

export const tasksReducer = slice.reducer;
