import { Grid, TextField, InputAdornment, Button, } from '@material-ui/core';
import React from 'react';
import Page from '../components/Page';
import useStyles from '../css/LoginStyles';
import loginImg from '../images/loginImg.jpg';
import { Email, Lock } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const classes = useStyles();

  return (
    <Page>
      <Grid container className={classes.page}>
        <Grid item xs={12} sm={6} className={classes.imgContainer}>
          <img src={loginImg} alt="" className={classes.modelImg} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.form}>
          <h1 className={classes.login}>Login</h1>
          <div>
            <TextField
              fullWidth
              type
              className={classes.field}
              helperText="Email Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              type
              className={classes.field}
              helperText="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/profile')}
              >
                Login
              </Button>
              <br />
              <br />
              New to Attractions?
              {' '}
              <Link to="/signUp">Create Account</Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Login;
