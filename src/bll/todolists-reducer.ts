import {todolistAPI, TodolistType} from "../dal/todolist-api";
import {AppThunk} from "./store";
import {RequestStatusType, setAppStatusAC} from "../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'TODO/REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'TODO/ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'TODO/CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'TODO/CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "TODO/GET_TODOLIST": {
            return action.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case "TODO/CHANGE_TODOLIST_ENTITY_STATUS": {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return state;
    }
}

// actions
export const removeTodolistAC = (id: string) =>
    ({type: 'TODO/REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'TODO/ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'TODO/CHANGE-TODOLIST-TITLE', id, title} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'TODO/CHANGE-TODOLIST-FILTER', id, filter} as const)

export const getTodolistAC = (todolist: TodolistType[]) =>
    ({type: 'TODO/GET_TODOLIST', todolist} as const)

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'TODO/CHANGE_TODOLIST_ENTITY_STATUS', id, entityStatus} as const)


// thunk
export const getTodolistTC = (): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(getTodolistAC(res.data))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }

export const removeTodolistTC = (todolistID: string): AppThunk =>
    (dispatch) => {
        dispatch(changeTodolistEntityStatusAC(todolistID, 'loading'))
        dispatch(setAppStatusAC('loading'))
        todolistAPI.deleteTodolist(todolistID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(removeTodolistAC(todolistID))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }

export const addTodolistTC = (title: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(addTodolistAC(res.data.data.item))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type GetTodolistActionType = ReturnType<typeof getTodolistAC>
export type TodolistActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | GetTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>