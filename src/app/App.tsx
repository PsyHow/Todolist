import React, { useEffect } from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from "@material-ui/icons";
import { TaskType } from '../dal/todolist-api';
import { TodolistList } from "../ui/features/TodolistList/TodolistList";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { initializeAppTC, RequestStatusType } from "./app-reducer";
import { ErrorSnackbar } from "../ui/components/errorSnackbar/ErrorSnackbar";
import { Login } from "../ui/features/Login/Login";
import { logoutTC } from "../ui/features/Login/auth-reducer";
import { Navigate, Route, Routes } from "react-router-dom";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if(!isInitialized) {
        return <div
            style={ { position: 'fixed', top: '30%', textAlign: 'center', width: '100%' } }>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar style={ { justifyContent: "space-between" } }>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    { isLoggedIn && <Button onClick={ logoutHandler } color="inherit">Logout</Button> }
                </Toolbar>
                { status === 'loading' && <LinearProgress/> }
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={ <TodolistList/> }/>
                    <Route path="login" element={ <Login/> }/>
                    <Route path="404" element={ <h1 style={ { textAlign: "center" } }> 404: Page not found</h1> }/>
                    <Route path="*" element={ <Navigate to="/404"/> }/>
                </Routes>
            </Container>
        </div>
    );
}


export default App;
