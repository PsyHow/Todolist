import { SetAppErrorType, setAppStatusAC, SetAppStatusType } from "../../../app/app-reducer";
import { authAPI, LoginRequestType }                         from "../../../dal/todolist-api";
import { handleServerAppError, handleServerNetworkError }    from "../../../utils/error-utils";
import { AxiosError }                                        from "axios";
import { AppThunk }                                          from "../../../bll/store";

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ( { type: 'login/SET-IS-LOGGED-IN', value } as const )

// thunks
export const loginTC = (data: LoginRequestType): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setIsLoggedInAC(true))

                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}


// types
type InitialStateType = typeof initialState
export type AuthActionType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusType | SetAppErrorType