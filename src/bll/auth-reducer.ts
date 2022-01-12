import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { OK_RESULT } from '../constants';

import { setAppStatusAC } from 'bll';
import { authAPI, LoginRequestType } from 'dal';
import { FieldsErrorsType } from 'dal/todolist_api/types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

// thunks

export const loginTC = createAsyncThunk<
  { isLoggedIn: boolean },
  LoginRequestType,
  { rejectValue: { errors: string[]; fieldsErrors?: FieldsErrorsType[] } }
>('auth/login', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
  try {
    const res = await authAPI.login(param);
    if (res.data.resultCode === OK_RESULT) {
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
      return { isLoggedIn: true };
    }
    handleServerAppError(thunkAPI.dispatch, res.data);
    return thunkAPI.rejectWithValue({
      errors: res.data.messages,
      fieldsErrors: res.data.fieldsErrors,
    });
  } catch (err) {
    // @ts-ignore
    const error: AxiosError = err;
    handleServerNetworkError(error, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: [error.message],
      fieldsErrors: undefined,
    });
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = action.payload.isLoggedIn;
    });
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

// thunks

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
