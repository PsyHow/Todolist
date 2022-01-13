import { AppRootStateType, RequestStatusType, TodolistDomainType } from 'bll';
import { Nullable } from 'types';

export const selectIsInitialized = (state: AppRootStateType): boolean =>
  state.appReducer.isInitialized;
export const selectStatus = (state: AppRootStateType): RequestStatusType =>
  state.appReducer.status;
export const selectAppError = (state: AppRootStateType): Nullable<string> =>
  state.appReducer.error;
export const selectIsLoggedIn = (state: AppRootStateType): boolean =>
  state.authReducer.isLoggedIn;
export const selectTodoLists = (state: AppRootStateType): TodolistDomainType[] =>
  state.todolistsReducer;
