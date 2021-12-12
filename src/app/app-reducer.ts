import { authAPI } from "../dal/todolist-api";
import { Dispatch } from "redux";
import { setIsLoggedInAC } from "../ui/features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        },
    },
})

export const { setAppStatusAC, setAppErrorAC, setIsInitializedAC } = slice.actions
export const appReducer = slice.reducer

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.me().then(res => {
        if(res.data.resultCode === 0) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            dispatch(setIsLoggedInAC({ value: true }));
        }
    })
        .finally(() => {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            dispatch(setIsInitializedAC({ isInitialized: true }))
        })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'