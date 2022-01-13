import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setAppStatusAC } from 'bll';
import { OK_RESULT } from 'const';
import { authAPI, LoginRequestType } from 'dal';
import { FieldsErrorsType } from 'dal/todolist_api/types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

// thunks
export const loginTC = createAsyncThunk<
  undefined,
  LoginRequestType,
  { rejectValue: { errors: string[]; fieldsErrors?: FieldsErrorsType[] } }
>('auth/login', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  try {
    const res = await authAPI.login(param);
    if (res.data.resultCode === OK_RESULT) {
      dispatch(setAppStatusAC({ status: 'succeeded' }));
      return undefined;
    }
    handleServerAppError(dispatch, res.data);
    return rejectWithValue({
      errors: res.data.messages,
      fieldsErrors: res.data.fieldsErrors,
    });
  } catch (error) {
    // @ts-ignore
    handleServerNetworkError(error, dispatch);
    return rejectWithValue({
      errors: [(error as Error).message],
      fieldsErrors: undefined,
    });
  }
});

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === OK_RESULT) {
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
      return param;
    }
    handleServerAppError(thunkAPI.dispatch, res.data);
    return thunkAPI.rejectWithValue({});
  } catch (error) {
    handleServerNetworkError(error as Error, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({});
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
    builder.addCase(loginTC.fulfilled, state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = true;
    });
    builder.addCase(logoutTC.fulfilled, state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;
