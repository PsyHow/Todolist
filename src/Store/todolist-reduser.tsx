import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

type ActionsType = RemoveTodolistAction
    | AddNewTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction

export type RemoveTodolistAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddNewTodolistAction = {
    type: 'ADD-TODOLIST'
    todolistId: string
    title: string
}
type ChangeTodolistTitleAction = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodolistFilterAction = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(f => f.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(m => m.id === action.id ? {...m, title: action.title} : m)]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)]
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const addTodolistAC = (title: string): AddNewTodolistAction => {
    return {type: 'ADD-TODOLIST', todolistId: v1(), title}
}
export const changeTodolistTitle = (title: string, id: string): ChangeTodolistTitleAction => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const changeTodolistFilter = (id: string, filter: FilterValuesType): ChangeTodolistFilterAction => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}