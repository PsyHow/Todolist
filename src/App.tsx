import { FC, useEffect } from 'react';

import './App.css';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { initializeAppTC, logoutTC } from 'bll';
import { TaskType } from 'dal';
import { selectIsInitialized, selectIsLoggedIn, selectStatus } from 'selectors';
import { ErrorSnackbar, Login, TodolistList } from 'ui';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const App: FC = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandle = (): void => {
    dispatch(logoutTC());
  };

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button onClick={logoutHandle} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistList />} />
          <Route path="login" element={<Login />} />
          <Route
            path="404"
            element={<h1 style={{ textAlign: 'center' }}> 404: Page not found</h1>}
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
