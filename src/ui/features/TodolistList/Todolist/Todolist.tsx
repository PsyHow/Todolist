import { FC, memo, useCallback, useEffect } from 'react';

import { Delete } from '@material-ui/icons';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppRootStateType,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTaskTC,
  fetchTaskTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from 'bll';
import { TaskType } from 'dal';
import { TaskStatuses } from 'enums';
import { AddItemForm, EditableSpan, Task } from 'ui';

type PropsType = {
  todolist: TodolistDomainType;
};

export const Todolist: FC<PropsType> = memo(
  ({ todolist: { id, title, filter, entityStatus } }) => {
    const dispatch = useDispatch();

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);

    let tasksForTodolist = tasks;

    useEffect(() => {
      dispatch(fetchTaskTC(id));
    }, [dispatch, id]);

    const removeTodolist = (): void => {
      dispatch(removeTodolistTC(id));
    };

    const addTask = useCallback(
      (taskTitle: string) => {
        dispatch(createTaskTC({ todolistId: id, title: taskTitle }));
      },
      [dispatch, id],
    );

    const changeTodolistTitle = useCallback(
      (taskTitle: string) => {
        dispatch(changeTodolistTitleTC({ todolistId: id, title: taskTitle }));
      },
      [dispatch, id],
    );

    const changeFilter = useCallback(
      (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({ id: todolistId, filter: value });
        dispatch(action);
      },
      [dispatch],
    );

    const onAllClickHandle = useCallback(
      () => changeFilter('all', id),
      [id, changeFilter],
    );

    const onActiveClickHandle = useCallback(
      () => changeFilter('active', id),
      [id, changeFilter],
    );

    const onCompletedClickHandle = useCallback(
      () => changeFilter('completed', id),
      [id, changeFilter],
    );

    if (filter === 'active') {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
      tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
      <div>
        <h3>
          <EditableSpan
            value={title}
            onChange={changeTodolistTitle}
            disabled={entityStatus === 'loading'}
          />
          <IconButton onClick={removeTodolist} disabled={entityStatus === 'loading'}>
            <Delete />
          </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={entityStatus === 'loading'} />
        <div>
          {tasksForTodolist.map(t => (
            <Task key={t.id} task={t} todolistId={id} entityStatus={entityStatus} />
          ))}
        </div>
        <div style={{ paddingTop: '10px' }}>
          <Button
            variant={filter === 'all' ? 'outlined' : 'text'}
            onClick={onAllClickHandle}
            color="inherit"
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'outlined' : 'text'}
            onClick={onActiveClickHandle}
            color="primary"
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'outlined' : 'text'}
            onClick={onCompletedClickHandle}
            color="secondary"
          >
            Completed
          </Button>
        </div>
      </div>
    );
  },
);
