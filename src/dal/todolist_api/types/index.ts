import { TaskPriorities, TaskStatuses } from 'enums';
import { Nullable } from 'types';

export type FieldsErrorsType = {
  field: string;
  error: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors?: FieldsErrorsType[];
  data: D;
};

export type GetTasksResponse = {
  error: Nullable<string>;
  totalCount: number;
  items: TaskType[];
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type UpdateTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
