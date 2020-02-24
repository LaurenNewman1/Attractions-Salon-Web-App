import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Layouts/Home';
import Book from './Layouts/Book';
import Services from './Layouts/Services';
import Contact from './Layouts/Contact';
import Login from './Layouts/Login';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import './CSS/App.css';

const App = () => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#f48fb1",
        light: "ffc1e3",
        dark: "#bf5f82"
      },
      secondary: {
        main: "#40cec5",
        light: "#7cfff8",
        dark: "#009c95"
      },
      background: {
        main: "#F5F5F6",
        light: "#fafafa",
        dark: "#E1E2E1"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/book" component={Book} />
          <Route path="/services" component={Services} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
