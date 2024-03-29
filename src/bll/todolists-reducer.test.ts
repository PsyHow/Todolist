import { v1 } from 'uuid';

import {
  FilterValuesType,
  RequestStatusType,
  TodolistDomainType,
  addTodolistTC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistTC,
  removeTodolistTC,
  todolistsReducer,
} from 'bll';
import { TodolistType } from 'dal';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[] = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ];
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(
    startState,
    removeTodolistTC.fulfilled({ id: todolistId1 }, 'requestId', todolistId1),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const todolist: TodolistType = {
    title: 'New Todolist',
    id: 'any id',
    addedDate: '',
    order: 0,
  };

  const endState = todolistsReducer(
    startState,
    addTodolistTC.fulfilled({ todolist }, 'requestId', todolist.title),
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(todolist.title);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist';

  const action = changeTodolistTitleTC.fulfilled(
    { id: todolistId2, title: newTodolistTitle },
    'requestId',
    { todolistId: todolistId2, title: newTodolistTitle },
  );

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  const newFilter: FilterValuesType = 'completed';

  const action = changeTodolistFilterAC({ id: todolistId2, filter: newFilter });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
test('todolists should be added', () => {
  const payload = { todolists: startState };
  const action = fetchTodolistTC.fulfilled(payload, 'requestId');

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});
test('correct entity status of todolist should be changed', () => {
  const newStatus: RequestStatusType = 'loading';

  const action = changeTodolistEntityStatusAC({
    id: todolistId2,
    entityStatus: newStatus,
  });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe(newStatus);
});
