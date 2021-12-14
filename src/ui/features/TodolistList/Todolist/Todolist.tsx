import React, { useCallback, useEffect } from 'react';

import { Delete } from '@material-ui/icons';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';

import { Task } from './Tasks/Task';

import { AppRootStateType } from 'bll/store';
import { createTaskTC, getTaskTC } from 'bll/tasks-reducer';
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from 'bll/todolists-reducer';
import { TaskStatuses, TaskType } from 'dal/todolist-api';
import { AddItemForm } from 'ui/components/addItemForm/AddItemForm';
import { EditableSpan } from 'ui/components/editableSpan/EditableSpan';

type PropsType = {
  todolist: TodolistDomainType;
};

export const Todolist = React.memo((props: PropsType) => {
  const { todolist } = props;
  const tasks = useSelector<AppRootStateType, TaskType[]>(
    state => state.tasks[todolist.id],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskTC(todolist.id));
  }, [dispatch, todolist.id]);

  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistTC(todolist.id));
  }, [dispatch, todolist.id]);

  const addTask = useCallback(
    (title: string) => {
      dispatch(createTaskTC(todolist.id, title));
    },
    [dispatch, todolist.id],
  );

  const changeTodolistTitle = useCallback(
    (title: string) => {
      dispatch(changeTodolistTitleTC(todolist.id, title));
    },
    [dispatch, todolist.id],
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      const action = changeTodolistFilterAC({ id: todolistId, filter: value });
      dispatch(action);
    },
    [dispatch],
  );

  const onAllClickHandler = useCallback(
    () => changeFilter('all', todolist.id),
    [todolist.id, changeFilter],
  );

  const onActiveClickHandler = useCallback(
    () => changeFilter('active', todolist.id),
    [todolist.id, changeFilter],
  );

  const onCompletedClickHandler = useCallback(
    () => changeFilter('completed', todolist.id),
    [todolist.id, changeFilter],
  );

  let tasksForTodolist = tasks;

  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan
          value={todolist.title}
          onChange={changeTodolistTitle}
          disabled={todolist.entityStatus === 'loading'}
        />
        <IconButton
          onClick={removeTodolist}
          disabled={todolist.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'} />
      <div>
        {tasksForTodolist.map(t => (
          <Task
            key={t.id}
            task={t}
            todolistId={todolist.id}
            entityStatus={todolist.entityStatus}
          />
        ))}
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          variant={todolist.filter === 'all' ? 'outlined' : 'text'}
          onClick={onAllClickHandler}
          color="inherit"
        >
          All
        </Button>
        <Button
          variant={todolist.filter === 'active' ? 'outlined' : 'text'}
          onClick={onActiveClickHandler}
          color="primary"
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
          onClick={onCompletedClickHandler}
          color="secondary"
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
