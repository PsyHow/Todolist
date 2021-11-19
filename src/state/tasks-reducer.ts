import {AddTodolistActionType, GetTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../app/App';
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../dal/todolist-api";
import {AppRootStateType, AppThunk} from "./store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "GET_TODOLIST":
            const stateCopy = {...state}
            action.todolist.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        case "GET-TASK":
            return {
                ...state, [action.todolistID]: action.tasks
            }
        default:
            return state;
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTaskAC = (todolistID: string, tasks: TaskType[]) =>
    ({type: 'GET-TASK', todolistID, tasks} as const)

// thunk
export const getTaskTC = (todolistId: string): AppThunk =>
    (dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTaskAC(todolistId, tasks))
            })
    }
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk =>
    (dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
export const createTaskTC = (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
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
            ...model
        }
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, model, todolistId))
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