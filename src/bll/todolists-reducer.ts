import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { RequestStatusType, setAppStatusAC } from 'app/app-reducer';
import { indexCheck, okResult, spliceElement } from 'constants/constants';
import { todolistAPI, TodolistType } from 'dal/todolist-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';

const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      if (index > indexCheck) {
        state.splice(index, spliceElement);
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ id: string; title: string }>) {
      const index = state.findIndex(f => f.id === action.payload.id);
      if (index > indexCheck) {
        // eslint-disable-next-line no-param-reassign
        state[index].title = action.payload.title;
      }
    },
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) {
      const index = state.findIndex(f => f.id === action.payload.id);
      if (index > indexCheck) {
        // eslint-disable-next-line no-param-reassign
        state[index].filter = action.payload.filter;
      }
    },
    getTodolistAC(state, action: PayloadAction<{ todolist: TodolistType[] }>) {
      return action.payload.todolist.map(tl => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      }));
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>,
    ) {
      const index = state.findIndex(f => f.id === action.payload.id);
      if (index > indexCheck) {
        // eslint-disable-next-line no-param-reassign
        state[index].entityStatus = action.payload.entityStatus;
      }
    },
  },
});

export const {
  changeTodolistEntityStatusAC,
  getTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  addTodolistAC,
  removeTodolistAC,
} = slice.actions;

export const todolistsReducer = slice.reducer;

// thunk
export const getTodolistTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistAPI
    .getTodolists()
    .then(res => {
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      dispatch(getTodolistAC({ todolist: res.data }));
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
  dispatch(changeTodolistEntityStatusAC({ entityStatus: 'loading', id: todolistID }));
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistAPI
    .deleteTodolist(todolistID)
    .then(res => {
      if (res.data.resultCode === okResult) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        dispatch(removeTodolistAC({ id: todolistID }));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const changeTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todolistAPI
      .updateTodolist(todolistId, title)
      .then(() => {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        dispatch(changeTodolistTitleAC({ id: todolistId, title }));
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  todolistAPI
    .createTodolist(title)
    .then(res => {
      if (res.data.resultCode === okResult) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        dispatch(addTodolistAC({ todolist: res.data.data.item }));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err, dispatch);
    });
};

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};