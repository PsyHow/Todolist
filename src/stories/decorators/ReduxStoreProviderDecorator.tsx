import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { v1 } from 'uuid';

import {
  appReducer,
  AppRootStateType,
  authReducer,
  tasksReducer,
  todolistsReducer,
} from 'bll';
import { TaskPriorities, TaskStatuses } from 'enums/enums';

const rootReducer: any = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

const initialGlobalState: AppRootStateType = {
  todolistsReducer: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'loading',
      addedDate: '',
      order: 0,
    },
  ],
  tasksReducer: {
    todolistId1: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  },
  appReducer: {
    error: null,
    status: 'succeeded',
    isInitialized: true,
  },
  authReducer: {
    isLoggedIn: true,
  },
};

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const BrowserRouterDecorator = (storyFn: any) => (
  <HashRouter>{storyFn()}</HashRouter>
);
