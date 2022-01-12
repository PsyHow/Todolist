import { FC } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormikHelpers, useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PASS_LENGTH } from '../../../constants';

import { AppRootStateType, loginTC } from 'bll';
import { useAppDispatch } from 'bll/store';
import { getIsLoggedIn } from 'selectors';

export const Login: FC = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector<AppRootStateType, boolean>(getIsLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required';
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      if (values.password.length < PASS_LENGTH) {
        errors.password = 'To short password';
      }
      return errors;
    },
    onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
      const action = await dispatch(loginTC(values));
      if (loginTC.rejected.match(action)) {
        if (action.payload?.fieldsErrors?.length) {
          const error = action.payload?.fieldsErrors[0];
          formikHelpers.setFieldError(error.field, error.error);
        }
      }
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a
                href="https://social-network.samuraijs.com/"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                label="Remember me"
                // eslint-disable-next-line react/jsx-props-no-spreading
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
};

// types
type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

type FormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
