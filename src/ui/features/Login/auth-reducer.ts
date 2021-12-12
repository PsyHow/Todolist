import { setAppStatusAC } from "../../../app/app-reducer";
import { authAPI, LoginRequestType } from "../../../dal/todolist-api";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";
import { AxiosError } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

const initialState = {
    isLoggedIn: false,
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        },
    },
})

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;


// thunks
export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.login(data)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(setAppStatusAC({ status: 'succeeded' }))
                dispatch(setIsLoggedInAC({ value: true }))

            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.logout()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({ value: false }))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}
