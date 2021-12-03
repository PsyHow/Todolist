import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../../../../components/editableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteTaskTC, updateTaskTC } from '../../../../../bll/tasks-reducer';
import { RequestStatusType } from "../../../../../app/app-reducer";
import { TaskStatuses, TaskType } from "../../../../../dal/todolist-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    entityStatus: RequestStatusType
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const { task, todolistId, entityStatus } = props

    const removeTask = useCallback(function () {
        dispatch(deleteTaskTC(todolistId, task.id))
    }, [dispatch, todolistId, task.id])

    const changeStatus = useCallback(function (e: ChangeEvent<HTMLInputElement>) {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(updateTaskTC(todolistId, task.id, { status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New }))
    }, [dispatch, todolistId, task.id]);

    const changeTaskTitle = useCallback(function (newTitle: string) {
        dispatch(updateTaskTC(todolistId, task.id, { title: newTitle }))
    }, [dispatch, todolistId, task.id]);

    return <div key={ task.id } className={ task.status === TaskStatuses.Completed ? 'is-done' : '' }>
        <Checkbox
            checked={ task.status === TaskStatuses.Completed }
            color="primary"
            onChange={ changeStatus }
        />
        <EditableSpan value={ task.title } onChange={ changeTaskTitle } disabled={ entityStatus === 'loading' }/>
        <IconButton onClick={ removeTask }>
            <Delete/>
        </IconButton>
    </div>
})
