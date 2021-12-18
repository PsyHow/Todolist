import { AxiosResponse } from 'axios';

import { apiConfig } from '../api_config';

import {
  TodolistType,
  ResponseType,
  GetTasksResponse,
  TaskType,
  UpdateTaskModelType,
} from './types';

export const todolistAPI = {
  getTodolists() {
    return apiConfig.get<TodolistType[]>('todo-lists');
  },
  createTodolist(title: string) {
    return apiConfig.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TodolistType }>>
    >('todo-lists', { title });
  },
  deleteTodolist(id: string) {
    return apiConfig.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return apiConfig.put<{ title: string }, AxiosResponse<ResponseType>>(
      `todo-lists/${id}`,
      { title },
    );
  },
  getTasks(todolistId: string) {
    return apiConfig.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return apiConfig.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(todolistId: string, title: string) {
    return apiConfig.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return apiConfig.put<
      UpdateTaskModelType,
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
