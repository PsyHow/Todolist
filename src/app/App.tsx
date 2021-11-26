import React from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from "@material-ui/icons";
import {TaskType} from '../dal/todolist-api';
import {TodolistList} from "../ui/features/TodolistList/TodolistList";
import {LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../ui/components/errorSnackbar/ErrorSnackbar";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            { status === 'loading' && <LinearProgress/> }
            <Container fixed>
                <TodolistList />
            </Container>
        </div>
    );
}


export default App;
