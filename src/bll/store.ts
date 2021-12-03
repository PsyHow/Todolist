import { TasksActionType, tasksReducer }                 from './tasks-reducer';
import { TodolistActionType, todolistsReducer }          from './todolists-reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction }                            from 'redux-thunk';
import { appReducer, AppReducerActionType } from "../app/app-reducer";
import { AuthActionType, authReducer }      from "../ui/features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = TodolistActionType | TasksActionType | AppReducerActionType | AuthActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

// @ts-ignore
window.store = store;
