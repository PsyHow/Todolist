import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { OK_RESULT } from '../constants';

import { RequestStatusType, setIsLoggedInAC } from 'bll';
import { authAPI } from 'dal';
import { Nullable } from 'types';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as Nullable<string>,
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
    setAppErrorAC(state, action: PayloadAction<{ error: Nullable<string> }>) {
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
      if (res.data.resultCode === OK_RESULT) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        dispatch(setIsLoggedInAC({ value: true }));
      }
    })
    .finally(() => {
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      dispatch(setIsInitializedAC({ isInitialized: true }));
    });
};
