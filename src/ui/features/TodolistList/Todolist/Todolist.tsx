import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/addItemForm/AddItemForm'
import {EditableSpan} from '../../../components/editableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Task} from './Tasks/Task'
import {useDispatch, useSelector} from "react-redux";
import {Delete} from '@material-ui/icons';
import {changeTodolistFilterAC, changeTodolistTitleTC, FilterValuesType, removeTodolistTC, TodolistDomainType} from "../../../../bll/todolists-reducer";
import {AppRootStateType} from "../../../../bll/store";
import {TaskStatuses, TaskType} from "../../../../dal/todolist-api";
import {createTaskTC, getTaskTC} from "../../../../bll/tasks-reducer";

type PropsType = {
    todolist: TodolistDomainType
}

export const Todolist = React.memo(function (props: PropsType) {
    const {id, title, filter, entityStatus} = props.todolist
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTaskTC(id))
    }, [dispatch, id])

    const removeTodolist = useCallback(function () {
        dispatch(removeTodolistTC(id))
    }, [dispatch, id]);

    const addTask = useCallback(function (title: string) {
        dispatch(createTaskTC(id, title))
    }, [dispatch, id]);

    const changeTodolistTitle = useCallback(function (title: string) {
        dispatch(changeTodolistTitleTC(id, title))
    }, [dispatch, id]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [id, changeFilter])

    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [id, changeFilter])

    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [id, changeFilter])

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === 'loading'}/>
            <IconButton onClick={removeTodolist} disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return <Task key={t.id}
                                 task={t}
                                 todolistId={id}
                                 entityStatus={entityStatus}
                    />
                })
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


