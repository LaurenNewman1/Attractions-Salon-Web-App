import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Home from './layouts/Home';
import Book from './layouts/Book';
import Services from './layouts/Services';
import Contact from './layouts/Contact';
import Login from './layouts/Login';
import Profile from './layouts/Profile';
import NavBar from './components/NavBar';
import SignUp from './layouts/SignUp';

import { useLogin } from './stores/LoginStores';

const App = () => {
  const [userData, loggedIn, login, register] = useLogin();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f48fb1',
        light: '#ffc1e3',
        dark: '#bf5f82',
      },
      secondary: {
        main: '#40cec5',
        light: '#7cfff8',
        dark: '#009c95',
      },
      background: {
        main: '#F5F5F6',
        light: '#fafafa',
        dark: '#E1E2E1',
      },
    },
  });

  return (
    <div style={{
      minHeight: '100vh'
    }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/book" component={Book} />
            <Route path="/services" component={Services} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/profile" component={Profile} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
