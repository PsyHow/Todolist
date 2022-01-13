import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { appReducer, authReducer, tasksReducer, todolistsReducer } from 'bll';

const rootReducer = combineReducers({
  tasksReducer,
  todolistsReducer,
  appReducer,
  authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>;
export type RootReducerType = typeof rootReducer;

// @ts-ignore
window.store = store;
