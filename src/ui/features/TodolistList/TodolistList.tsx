import { FC, useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { addTodolistTC, fetchTodolistTC } from 'bll';
import { selectIsLoggedIn, selectTodoLists } from 'selectors';
import { AddItemForm, Todolist } from 'ui';

export const TodolistList: FC = () => {
  const dispatch = useDispatch();

  const todoLists = useSelector(selectTodoLists);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistTC());
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
        {todoLists.map(tl => (
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
