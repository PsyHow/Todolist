import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {  //создаем типизацию для всех тудулистов
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {             //создаем типизацию для Тасков тудулиста
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"

export function App() {

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolist, setTodolist] = useState<TodolistType[]>([    // создаем стейт в котором будем хранить тудулисты
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({  //отдельный стейт для тасков тудулиста
        [todolistID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: true},
        ]
    })

    const removeTask = (taskID: string, todolistID: string) => {
        //для того чтобы удалить таску нужно взять объект тасков с его айди и найти нужную таску по айди

        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(f => f.id !== todolistID))
        delete tasks[todolistID]
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks})
    }

    const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title: title} : t)
        setTasks({...tasks})
    }
    const changeTodolistTitle = (title: string, todolistID:string) => {
        setTodolist(todolist.map(m=> m.id === todolistID ? {...m, title }: m))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    const addTodolist = (title: string) => {
        const todolist_Id = v1()
        const todolists: TodolistType = {
            id: todolist_Id,
            title: title,
            filter: 'all'
        }
        setTodolist([todolists, ...todolist])
        setTasks({...tasks, [todolist_Id]: []})
    }

    //UI:
    const todolistComponents = todolist.map(t => {

        let tasksForRender = tasks[t.id]
        if (t.filter === "active") {
            tasksForRender = tasks[t.id].filter(t => !t.isDone)
        }
        if (t.filter === "completed") {
            tasksForRender = tasks[t.id].filter(t => t.isDone)
        }

        return (
            <TodoList
                key={t.id}// TodoList()
                id={t.id}
                filter={t.filter}
                title={t.title}
                removeTodolist={removeTodolist}
                tasks={tasksForRender}
                addItem={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })
    //


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolistComponents}
        </div>
    );
}
