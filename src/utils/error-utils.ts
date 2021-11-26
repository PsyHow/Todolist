import {AppReducerActionType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../dal/todolist-api";

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<AppReducerActionType>) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppReducerActionType>,data:ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Unknown error'))
    }
    dispatch(setAppStatusAC('failed'))
}