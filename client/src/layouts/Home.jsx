import React from 'react';
import {
  Grid, Typography, Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Page from '../components/Page';
import useStyles from '../css/HomeStyles';
import coverModel from '../images/coverModel.png';

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page>
      <Grid container className={classes.page}>
        <Grid item xs={12} className={classes.blackBox}>
          <Grid container className={classes.page}>
            <Grid item xs={6} className={classes.leftContainer}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography className={classes.welcomeText} variant="h4">
                    Welcome to Attractions Salon!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.welcomeText} variant="body2">
                    Dedicated to helping you be your most beautiful self
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center" className={classes.bookBtn}>
                  <Button variant="contained" color="primary" onClick={() => history.push('/book')}>
                    Make a Booking
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} align="center" className={classes.rightContainer}>
              <img src={coverModel} alt="" className={classes.modelImg} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
