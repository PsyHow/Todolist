import {FilterValuesType, TodolistType} from "../App";

type ActionsType = RemoveTodolistType | AddNewTodolistType | ChangeTodolistTitleTYpe | ChangeTodolistFilter

type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddNewTodolistType = {
    type: 'ADD-TODOLIST'
    newTodolistID: string
    title: string
}
type ChangeTodolistTitleTYpe = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(f => f.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: action.newTodolistID, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(m => m.id === action.id ? {...m, title: action.title} : m)]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)]
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const addTodolistAC = (title: string, newTodolistID: string): AddNewTodolistType => {
    return {type: 'ADD-TODOLIST', newTodolistID, title}
}
export const changeTodolistTitle = (title: string, id: string): ChangeTodolistTitleTYpe => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const changeTodolistFilter = (id: string, filter: FilterValuesType): ChangeTodolistFilter => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}