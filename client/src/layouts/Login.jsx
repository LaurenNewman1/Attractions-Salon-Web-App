import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import Page from '../components/Page';
import SignUp from '../components/SignUp';
import tempLoginPic from '../loginImage.jpg';
import tempSignUpPic from '../signUpImage.jpg';
import { useHistory } from 'react-router-dom';
// import { LoginStores } from '../stores/LoginStores';
// import { useState } from 'react';

const style = {
  Paper: { padding: 50, marginTop: 10, marginBottom: 10 },
};

const Login = (props) => {

  const location = useLocation();
  const login = location.pathname === '/login';
  const history = useHistory();

  React.useEffect(() => {
    if (props.loggedIn === true) {
      // redirect
      history.push('/Profile');
    }
  }, [props.loggedIn]);

  // This calls login variable in the LoginStores.jsx
  const loginClick = async (email, password) => {
    const userLoggedIn =  props.login(email, password);
    // consoleLogFunc(userLoggedIn);
    // console.log("Temp check: " + props.loggedIn);

  }

  const consoleLogFunc = (userLoggedIn) => {
    console.log("temporary: " + userLoggedIn);
  }

  // This calls the register variable in LoginStores.jsx
  const createAccountClick = (name, email, number, password) => {
    props.register(name, email, number, password);
  }

  const renderContents = () => {
    if (login) {
      return <LoginComponent
      loginClick={loginClick}
      loggedIn={props.loggedIn}
      />;
    }
    return <SignUp
      createAccountClick={createAccountClick}
      />;
  };

  const renderPicture = () => {
    const loginScreen = location.pathname === '/login';
    const signUpScreen = location.pathname === '/SignUp';

    if (loginScreen) {
      return tempLoginPic;
    }

    if (signUpScreen) {
      return tempSignUpPic;
    }
    // This needs to be figured out
    return tempLoginPic;
  };

  return (
    <Page>
      <Grid container style={{ alignItems: "center" }}>
        <Grid item xs={12} md={6}>
          <Paper style={style.Paper} elevation={3}>
            <div>
              <div style={{ height: '50vh', background: `url(${renderPicture()}) no-repeat center center`, backgroundSize: 'cover' }} />
              Picture Either Logo or Profile
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={style.Paper} elevation={3}>
            { renderContents() }
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Login;
