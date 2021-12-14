import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { AppRootStateType } from './store';
import { addTodolistAC, getTodolistAC, removeTodolistAC } from './todolists-reducer';

import { TasksStateType } from 'app/App';
import { setAppStatusAC } from 'app/app-reducer';
import {
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from 'dal/todolist-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ taskId: string; todolistId: string }>) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
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
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTaskAC(state, action: PayloadAction<{ todolistID: string; tasks: TaskType[] }>) {
      state[action.payload.todolistID] = action.payload.tasks;
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(getTodolistAC, (state, action) => {
      action.payload.todolist.forEach((tl: any) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });
  },
});

export const { removeTaskAC, addTaskAC, updateTaskAC, setTaskAC } = slice.actions;

export const tasksReducer = slice.reducer;

// thunk
export const getTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistAPI
    .getTasks(todolistId)
    .then(res => {
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      const tasks = res.data.items;
      dispatch(setTaskAC({ todolistID: todolistId, tasks }));
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const deleteTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then(() => {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        dispatch(removeTaskAC({ taskId, todolistId }));
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const createTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistAPI
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
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
        if (res.data.resultCode === 0) {
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
