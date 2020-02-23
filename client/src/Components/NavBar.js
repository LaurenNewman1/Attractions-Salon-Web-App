import React from 'react';
import {AppBar, Toolbar, Button, Typography} from '@material-ui/core';
import "../CSS/NavBar.css";
import { useHistory } from 'react-router-dom';

function NavBar() {
  const history = useHistory();

  return (
    <AppBar position="static">
        <Toolbar>
            <Button onClick={() => history.push("/")}><Typography class="logo">Attractions Salon</Typography></Button>
            <div class="grow"/>
            <Button onClick={() => history.push("/book")}>Book</Button>
            <Button onClick={() => history.push("/services")}>Services</Button>
            <Button onClick={() => history.push("/contact")}>Contact</Button>
            <Button onClick={() => history.push("/login")}>Login</Button>
        </Toolbar>
    </AppBar>
  );
}

export default NavBar;