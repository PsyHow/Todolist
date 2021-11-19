import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Task} from './Task'
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC
} from './state/todolists-reducer'
import {useDispatch, useSelector} from "react-redux";
import {createTaskTC, getTaskTC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./dal/todolist-api";
import {Delete} from '@material-ui/icons';
import {AppRootStateType} from "./state/store";

type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}

export const Todolist = React.memo(function (props: PropsType) {
    const {todolistId, title, filter} = props
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTaskTC(todolistId))
    }, [dispatch, todolistId])

    const removeTodolist = useCallback(function () {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch, todolistId]);

    const addTask = useCallback(function (title: string) {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch, todolistId]);

    const changeTodolistTitle = useCallback(function (title: string) {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch, todolistId]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const onAllClickHandler = useCallback(() => changeFilter('all', todolistId), [todolistId, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolistId), [todolistId, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todolistId), [todolistId, changeFilter])


    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return <Task key={t.id}
                                 task={t}
                                 todolistId={todolistId}
                    />
                })
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


