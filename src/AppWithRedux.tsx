import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./Store/todolist-reduser";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {  //создаем типизацию для всех тудулистов
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {             //создаем типизацию для Тасков тудулиста
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"

export function AppWithRedux() {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)
    const todolist = useSelector<AppRootStateType, TodolistType[]>( state => state.todoLists)


    const removeTask = useCallback( (taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(taskID,todolistID))
    },[dispatch])
    const addTask = useCallback( (title: string, todolistID: string) => {
        dispatch(addTaskAC(title,todolistID))
    },[dispatch])

    const removeTodolist = useCallback( (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    },[dispatch])

    const changeTaskStatus = useCallback( (taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID,isDone,todolistID))
    },[dispatch])

    const changeTaskTitle = useCallback( (taskID: string, title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID,title,todolistID))
    },[dispatch])
    const changeTodolistTitle = useCallback( (title: string, todolistID: string) => {
        dispatch(changeTodolistTitleAC(title,todolistID))
    },[dispatch])

    const changeTodoListFilter = useCallback( (filter: FilterValuesType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(filter,todolistID))
    },[dispatch])

    const addTodolist = useCallback( (title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])
    //UI:

    const todolistComponents = todolist.map(t => {

        return (
            <Grid item key={t.id}>
                <Paper elevation={5} style={{padding: '15px'}}>
                    <TodoList
                        id={t.id}
                        filter={t.filter}
                        title={t.title}
                        removeTodolist={removeTodolist}
                        tasks={tasks[t.id]}
                        addItem={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>

            </Grid>

        )
    })
    //
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color="inherit">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit"
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      style={{padding: '15px', justifyContent: 'center'}}>
                    <Grid item>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>

                </Grid>
                <Grid container spacing={5}
                      style={{justifyContent: 'center'}}>
                    {todolistComponents}
                </Grid>

            </Container>

        </div>
    );
}
