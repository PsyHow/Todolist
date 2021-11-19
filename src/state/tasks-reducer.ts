import {AddTodolistActionType, GetTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../dal/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType | AddTodolistActionType
    | RemoveTodolistActionType | GetTodolistActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "GET_TODOLIST": {
            const stateCopy = {...state}
            action.todolist.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId]
                        .filter(f => f.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]:
                    [action.task, ...state[action.task.todoListId]]
            }

        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "GET-TASK": {
            return {
                ...state, [action.todolistID]: [...action.tasks]
            }

        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}
export const setTaskAC = (todolistID: string, tasks: TaskType[]) => {
    return {type: 'GET-TASK', todolistID, tasks} as const
}


//Thunk

export const getTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(todolistId, tasks))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
        ...model
    }
    todolistAPI.updateTask(todolistId, taskId, apiModel)
        .then((res) => {
            dispatch(updateTaskAC(taskId, model, todolistId))
        })

}
