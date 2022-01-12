import { TasksStateType } from '../App';

import { tasksReducer } from './tasks-reducer';
import { addTodolistTC, todolistsReducer } from './todolists-reducer';

import { TodolistDomainType } from 'bll';
import { TodolistType } from 'dal';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const todolist: TodolistType = {
    title: 'new todolist',
    id: 'any id',
    addedDate: '',
    order: 0,
  };

  const action = addTodolistTC.fulfilled({ todolist }, 'requestId', todolist.title);

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
