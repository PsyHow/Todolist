import { TodolistType } from 'dal';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
