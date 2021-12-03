import { authAPI }         from "../dal/todolist-api";
import { Dispatch }        from "redux";
import { setIsLoggedInAC } from "../ui/features/Login/auth-reducer";


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case "APP/SET-ERROR":
            return { ...state, error: action.error }
        case "APP/SET-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ( { type: 'APP/SET-STATUS', status } as const )

export const setAppErrorAC = (error: null | string) => ( { type: 'APP/SET-ERROR', error } as const )

export const setIsInitializedAC = (isInitialized: boolean) => ( {
    type: "APP/SET-INITIALIZED",
    isInitialized,
} as const )

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(true));
        }
    })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsInitializedAC(true))
        })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type AppReducerActionType = SetAppStatusType | SetAppErrorType | SetIsInitializedType