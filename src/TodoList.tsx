import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {Task} from './Task';

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    addItem: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }

    const removeTask = useCallback((taskId) => props.removeTask(taskId, props.id),[props.removeTask,props.id])
    const changeStatus = useCallback((taskId, isDone) => props.changeTaskStatus(taskId, isDone, props.id),[props.changeTaskStatus, props.id])
    const changeTitle = useCallback((taskID, title) => props.changeTaskTitle(taskID, title, props.id),[props.changeTaskTitle,props.id])
    const tasksList = tasksForTodolist.map(t => {
        return (
            <Task key={t.id}
                  task={t}
                  removeTask={removeTask}
                  changeStatus={changeStatus}
                  changeTitle={changeTitle}/>
        )
    })

    const setAllFilter = useCallback(() => props.changeTodoListFilter("all", props.id), [props.changeTodoListFilter, props.id])
    const setActiveFilter = useCallback(() => props.changeTodoListFilter("active", props.id), [props.changeTodoListFilter, props.id])
    const setCompletedFilter = useCallback(() => props.changeTodoListFilter("completed", props.id), [props.changeTodoListFilter, props.id])

    const addTask = useCallback((title: string) => props.addItem(title, props.id), [props.addItem, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [props.changeTodolistTitle, props.id])
    const removeTodolist = useCallback(() => props.removeTodolist(props.id),[props.removeTodolist,props.id])


    return (
        <div>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete fontSize={"small"}/>
            </IconButton>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <List>
                {tasksList}
            </List>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    size={"small"}
                    style={{margin: '0 3px'}}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    size={"small"}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
})