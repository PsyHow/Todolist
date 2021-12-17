import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRootStateType, addTodolistTC, getTodolistTC, TodolistDomainType } from 'bll';
import { Todolist, AddItemForm } from 'ui';

export const TodolistList: React.FC = () => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    state => state.todolists,
  );
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getTodolistTC());
  }, [dispatch]);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: '15px', justifyContent: 'center' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={5} style={{ justifyContent: 'center' }}>
        {todolists.map(tl => (
          <Grid item key={tl.id}>
            <Paper style={{ padding: '10px' }}>
              <Todolist todolist={tl} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
