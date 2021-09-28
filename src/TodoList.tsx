import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

function TodoList(props: TodoListPropsType) {

    const tasksList = props.tasks.map(t => {
        const changeStatus =
            (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }

        return (
            <ListItem style={{padding:'0px'}}
                      key={t.id} className={!t.isDone ? "notCompleted" : ""}>
                <Checkbox
                    color={"primary"}
                    size={"small"}
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTitle}/>
                <IconButton aria-label={'delete'} onClick={() => props.removeTask(t.id, props.id)}>
                    <Delete fontSize={"small"}/>
                </IconButton>

            </ListItem>
        )
    })

    const setAllFilter = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.id)

    const addTask = (title: string) => props.addItem(title, props.id)

    let allBtnClass = "";
    if (props.filter === "all") {
        allBtnClass = "active-filter"
    }
    //const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    //const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return (
        <div>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton onClick={() => props.removeTodolist(props.id)}>
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
}

export default TodoList;