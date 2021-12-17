import React, { ChangeEvent, useCallback } from 'react';

import { Delete } from '@material-ui/icons';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';

import { RequestStatusType, deleteTaskTC, updateTaskTC } from 'bll';
import { TaskStatuses, TaskType } from 'dal';
import { EditableSpan } from 'ui';

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  entityStatus: RequestStatusType;
};
export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const { task, todolistId, entityStatus } = props;

  const removeTask = useCallback(() => {
    dispatch(deleteTaskTC(todolistId, task.id));
  }, [dispatch, todolistId, task.id]);

  const changeStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;
      dispatch(
        updateTaskTC(todolistId, task.id, {
          status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        }),
      );
    },
    [dispatch, todolistId, task.id],
  );

  const changeTaskTitle = useCallback(
    (newTitle: string) => {
      dispatch(updateTaskTC(todolistId, task.id, { title: newTitle }));
    },
    [dispatch, todolistId, task.id],
  );

  return (
    <div
      key={task.id}
      className={task.status === TaskStatuses.Completed ? 'is-done' : ''}
    >
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color="primary"
        onChange={changeStatus}
      />
      <EditableSpan
        value={task.title}
        onChange={changeTaskTitle}
        disabled={entityStatus === 'loading'}
      />
      <IconButton onClick={removeTask}>
        <Delete />
      </IconButton>
    </div>
  );
});
