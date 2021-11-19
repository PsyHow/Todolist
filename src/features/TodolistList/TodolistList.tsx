import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTodolistTC, getTodolistTC, TodolistDomainType} from "../../state/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";

export const TodolistList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch]);

    return <>
        <Grid container style={{padding: '15px', justifyContent: 'center'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={5} style={{justifyContent: 'center'}}>
            {
                todolists.map(tl => {
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}