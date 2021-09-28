import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
            <li key={t.id} className={!t.isDone ? "notCompleted" : ""}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTitle}/>
                {/*<span>{t.title}</span>*/}
                <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
            </li>
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
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return (
        <div>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <button onClick={() => props.removeTodolist(props.id)}>x</button>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilter}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;