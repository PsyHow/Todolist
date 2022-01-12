import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { INDEX_CHECK, OK_RESULT, SPLICE_ELEMENT } from '../constants';

import { AppRootStateType } from './store';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';

import { TasksStateType } from 'App';
import { setAppStatusAC } from 'bll';
import { TaskType, todolistAPI, UpdateTaskModelType } from 'dal';
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

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateTaskModelType;
        todolistId: string;
      }>,
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index > INDEX_CHECK) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolistAC, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      delete state[action.payload.id];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
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
  },
});

export const tasksReducer = slice.reducer;

export const { addTaskAC, updateTaskAC } = slice.actions;

// thunk

export const createTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistAPI
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === OK_RESULT) {
          dispatch(setAppStatusAC({ status: 'succeeded' }));
          dispatch(addTaskAC({ task: res.data.data.item }));
        } else {
          handleServerAppError(dispatch, res.data);
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const updateTaskTC =
  (todolistId: string, taskId: string, model: UpdateTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
      return;
    }
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      status:
        task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New,
      deadline: task.deadline,
      startDate: task.startDate,
      priority: task.priority,
      description: task.description,
      ...model,
    };
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === OK_RESULT) {
          dispatch(setAppStatusAC({ status: 'succeeded' }));
          dispatch(updateTaskAC({ taskId, model, todolistId }));
        } else {
          handleServerAppError(dispatch, res.data);
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch);
      });
  };
