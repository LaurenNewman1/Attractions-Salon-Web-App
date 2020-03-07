// import { Button } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginComponent from '../components/Login';
import Page from '../components/Page';
import SignUp from '../components/SignUp';

const style = {
  Paper: { padding: 50, marginTop: 10, marginBottom: 10 },
};

const Login = () => {
  const location = useLocation();
  const login = location.pathname === '/login';

  const renderContents = () => {
    if (login) {
      return <LoginComponent />;
    }
    return <SignUp />;
  };


  return (
    <Page>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper style={style.Paper}>Picture Either Logo or Profile</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={style.Paper}>
            { renderContents() }
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Login;
