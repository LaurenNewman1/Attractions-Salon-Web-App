import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginComponent from '../components/Login';
import Page from '../components/Page';
import SignUp from '../components/SignUp';
import tempLoginPic from '../loginImage.jpg';
import tempSignUpPic from '../signUpImage.jpg';

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

  const renderPicture = () => {
    const myLocation = useLocation();
    const loginScreen = myLocation.pathname === '/login';
    const signUpScreen = myLocation.pathname === '/SignUp';

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
