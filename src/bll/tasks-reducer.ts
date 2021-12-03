import { AddTodolistActionType, GetTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import { TasksStateType }                                                         from '../app/App';
import { TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType }               from "../dal/todolist-api";
import { AppRootStateType, AppThunk }                                             from "./store";
import { setAppStatusAC }                                                         from "../app/app-reducer";
import { handleServerAppError, handleServerNetworkError }                         from "../utils/error-utils";
import { AxiosError }                                                             from "axios";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "TODO/GET_TODOLIST":
            const stateCopy = { ...state }
            action.todolist.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'TASK/REMOVE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId) }
        case 'TASK/ADD-TASK':
            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
        case 'TASK/UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? { ...t, ...action.model } : t),
            }
        case 'TODO/ADD-TODOLIST':
            return { ...state, [action.todolist.id]: [] }
        case 'TODO/REMOVE-TODOLIST':
            const copyState = { ...state };
            delete copyState[action.id];
            return copyState;
        case "TASK/GET-TASK":
            return {
                ...state, [action.todolistID]: action.tasks,
            }
        default:
            return state;
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ( { type: 'TASK/REMOVE-TASK', taskId, todolistId } as const )
export const addTaskAC = (task: TaskType) =>
    ( { type: 'TASK/ADD-TASK', task } as const )
export const updateTaskAC = (taskId: string, model: UpdateTaskModelType, todolistId: string) =>
    ( { type: 'TASK/UPDATE-TASK', model, todolistId, taskId } as const )
export const setTaskAC = (todolistID: string, tasks: TaskType[]) =>
    ( { type: 'TASK/GET-TASK', todolistID, tasks } as const )

// thunk
export const getTaskTC = (todolistId: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                const tasks = res.data.items
                dispatch(setTaskAC(todolistId, tasks))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(removeTaskAC(taskId, todolistId))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }

export const createTaskTC = (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(addTaskAC(res.data.data.item))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }


export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType): AppThunk =>
    (dispatch,
     getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New,
            deadline: task.deadline,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            ...model,
        }
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(updateTaskAC(taskId, model, todolistId))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })

    }

// types
export type TasksActionType = AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistActionType
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>