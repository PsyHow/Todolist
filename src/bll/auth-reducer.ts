import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { OK_RESULT } from '../constants';

import { setAppStatusAC } from 'bll';
import { LoginRequestType, authAPI } from 'dal';
import { handleServerAppError, handleServerNetworkError } from 'utils';

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

// thunks
export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  authAPI
    .login(data)
    .then(res => {
      if (res.data.resultCode === OK_RESULT) {
        dispatch(setAppStatusAC({ status: 'succeeded' }));
        dispatch(setIsLoggedInAC({ value: true }));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === OK_RESULT) {
        dispatch(setIsLoggedInAC({ value: false }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      } else {
        handleServerAppError(dispatch, res.data);
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err, dispatch);
    });
};
