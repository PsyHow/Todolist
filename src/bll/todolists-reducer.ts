import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INDEX_CHECK, OK_RESULT, SPLICE_ELEMENT } from '../constants';

import {
  FilterValuesType,
  RequestStatusType,
  setAppStatusAC,
  TodolistDomainType,
} from 'bll';
import { todolistAPI } from 'dal';
import { handleServerAppError, handleServerNetworkError } from 'utils';

// thunks
export const fetchTodolistTC = createAsyncThunk(
  'todolist/fetchTodolist',
  async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await todolistAPI.getTodolists();
    try {
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      return { todolists: res.data };
    } catch (error) {
      handleServerNetworkError(error as Error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const removeTodolistTC = createAsyncThunk(
  'todolist/removeTodolist',
  async (todolistID: string, { dispatch, rejectWithValue }) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(changeTodolistEntityStatusAC({ entityStatus: 'loading', id: todolistID }));
    dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await todolistAPI.deleteTodolist(todolistID);
    try {
      if (res.data.resultCode === OK_RESULT) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        return { id: todolistID };
      }
      handleServerAppError(dispatch, res.data);
      return rejectWithValue(null);
    } catch (error) {
      handleServerNetworkError(error as Error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const changeTodolistTitleTC = createAsyncThunk(
  'todolist/changeTodolistTitle',
  async (param: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    await todolistAPI.updateTodolist(param.todolistId, param.title);
    try {
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      return { id: param.todolistId, title: param.title };
    } catch (error) {
      handleServerNetworkError(error as Error, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const addTodolistTC = createAsyncThunk(
  'todolist/addTodolist',
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    const res = await todolistAPI.createTodolist(title);
    try {
      if (res.data.resultCode === OK_RESULT) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        return { todolist: res.data.data.item };
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
  name: 'todolist',
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) {
      const index = state.findIndex(f => f.id === action.payload.id);
      if (index > INDEX_CHECK) {
        // eslint-disable-next-line no-param-reassign
        state[index].filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>,
    ) {
      const index = state.findIndex(f => f.id === action.payload.id);
      if (index > INDEX_CHECK) {
        // eslint-disable-next-line no-param-reassign
        state[index].entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTodolistTC.fulfilled, (state, action) =>
      action.payload.todolists.map(tl => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      })),
    );
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      if (index > INDEX_CHECK) {
        state.splice(index, SPLICE_ELEMENT);
      }
    });
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(f => f.id === action.payload.id);
      if (index > INDEX_CHECK) {
        // eslint-disable-next-line no-param-reassign
        state[index].title = action.payload.title;
      }
    });
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
    });
  },
});

export const { changeTodolistEntityStatusAC, changeTodolistFilterAC } = slice.actions;

export const todolistsReducer = slice.reducer;
