import { AxiosResponse } from 'axios';

import { ResponseType } from '../todolist_api';

import { AuthMeType, LoginRequestType } from './types';

import { apiConfig } from 'dal';

export const authAPI = {
  login(data: LoginRequestType) {
    return apiConfig.post<
      LoginRequestType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >(`auth/login`, data);
  },
  me() {
    return apiConfig.get<ResponseType<AuthMeType>>(`auth/me`);
  },
  logout() {
    return apiConfig.delete<ResponseType>(`auth/login`);
  },
};
