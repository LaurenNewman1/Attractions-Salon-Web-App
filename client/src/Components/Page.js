import React from 'react';
import {AppBar, Toolbar, Button, Typography, Container, useTheme} from '@material-ui/core';
import "../CSS/Page.css";
import { useHistory } from 'react-router-dom';

const Page = (props) => {
    const theme = useTheme();
    const history = useHistory();

    return (
        <Container class="background" style={{backgroundColor: theme.palette.background.main}}>
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
            <div class="body">
                {props.children}
            </div>
        </Container>
    );
}

export default Page;