import { AppRootStateType } from 'bll';

export const getIsLoggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn;
