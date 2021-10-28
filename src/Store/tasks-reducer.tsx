import {v1} from 'uuid';
import { TasksStateType } from '../AppWithRedux';
import {AddNewTodolistAction, RemoveTodolistAction} from './todolist-reduser';

type RemoveTaskAction = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskAction = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusAction = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

type ChangeTitleStatusAction = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionsType =
    RemoveTaskAction
    | AddTaskAction
    | AddNewTodolistAction
    | ChangeTaskStatusAction
    | ChangeTitleStatusAction
    | RemoveTodolistAction;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId ? {...m, isDone: action.isDone} : m)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId ? {...m, title: action.title} : m)
            }
        case "REMOVE-TODOLIST":
            /*let copyState = {...state}
             delete copyState[action.id]
             return copyState*/
            let {[action.id]: [], ...copyState} = {...state}
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAction => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAction => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAction => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleStatusAction => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
