import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { setIsLoggedInAC } from 'bll';
import { okResult } from 'constants/constants';
import { authAPI } from 'dal';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload.status;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: null | string }>) {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload.error;
    },
    setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      // eslint-disable-next-line no-param-reassign
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const { setAppStatusAC, setAppErrorAC, setIsInitializedAC } = slice.actions;
export const appReducer = slice.reducer;

// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === okResult) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        dispatch(setIsLoggedInAC({ value: true }));
      }
    })
    .finally(() => {
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      dispatch(setIsInitializedAC({ isInitialized: true }));
    });
};

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
