import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolist-reduser";

const rootReducer = combineReducers(
    {
        tasks: tasksReducer,
        todoLists: todolistsReducer,
    }
)

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>