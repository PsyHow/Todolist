import { setAppErrorAC, setAppStatusAC } from "../app/app-reducer";
import { Dispatch } from "redux";
import { ResponseType } from "../dal/todolist-api";

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({ error: error.message }))
    dispatch(setAppStatusAC({ status: 'failed' }))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC({ error: data.messages[0] }))
    } else {
        dispatch(setAppErrorAC({ error: 'Unknown error' }))
    }
    dispatch(setAppStatusAC({ status: 'failed' }))
}