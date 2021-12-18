import { ChangeEvent, FC, memo, useCallback } from 'react';

import { Delete } from '@material-ui/icons';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';

import { RequestStatusType, deleteTaskTC, updateTaskTC } from 'bll';
import { TaskType } from 'dal';
import { TaskStatuses } from 'enums';
import { EditableSpan } from 'ui';

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  entityStatus: RequestStatusType;
};
export const Task: FC<TaskPropsType> = memo(({ task, todolistId, entityStatus }) => {
  const dispatch = useDispatch();

  const removeTask = (): void => {
    dispatch(deleteTaskTC(todolistId, task.id));
  };

  const changeStatus = (e: ChangeEvent<HTMLInputElement>): void => {
    const newIsDoneValue = e.currentTarget.checked;
    dispatch(
      updateTaskTC(todolistId, task.id, {
        status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
      }),
    );
  };

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
