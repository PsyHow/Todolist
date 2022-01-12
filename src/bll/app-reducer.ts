import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OK_RESULT } from '../constants';

import { RequestStatusType, setIsLoggedInAC } from 'bll';
import { authAPI } from 'dal';
import { Nullable } from 'types';

// thunks
export const initializeAppTC = createAsyncThunk(
  'app/initializeApp',
  async (param, { dispatch }) => {
    const res = await authAPI.me();
    if (res.data.resultCode === OK_RESULT) {
      dispatch(setIsLoggedInAC({ value: true }));
    }
  },
);

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as Nullable<string>,
    isInitialized: false,
  } as InitialStateType,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: Nullable<string> }>) {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, state => {
      // eslint-disable-next-line no-param-reassign
      state.isInitialized = true;
    });
  },
});

export const { setAppStatusAC, setAppErrorAC } = slice.actions;
export const appReducer = slice.reducer;
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};
