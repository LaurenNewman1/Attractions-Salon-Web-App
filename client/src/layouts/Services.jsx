import React from 'react';
import {
  Typography, Card, CardMedia, CardContent, Grid, CardActions, Button, Paper,
} from '@material-ui/core';
import {
  AccessTime,
} from '@material-ui/icons';
import {
  useHistory,
} from 'react-router-dom';
import Page from '../components/Page';
import useStyles from '../css/ServiceStyles';
import hair from '../images/hair.jpeg';

const Services = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page>
      <Typography variant="h4">Nails</Typography>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={3}>
          <Card>
            <CardMedia component="image" image={hair} className={classes.media}>
              <div className={classes.price}>
                <Paper className={classes.pricePaper}>
                  <Typography variant="body2">$30</Typography>
                </Paper>
              </div>
            </CardMedia>
            <CardContent>
              <div className={classes.flexContainer}>
                <Typography variant="subtitle1">Trim</Typography>
                <Typography variant="subtitle2" className={classes.time}>
                  <AccessTime />
                  {' '}
                  30 min
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary" component="p">
                This is a description of what this service is.
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => history.push('/book')}
              >
                Book Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardMedia component="image" image={hair} className={classes.media}>
              <div className={classes.price}>
                <Paper className={classes.pricePaper}>
                  <Typography variant="body2">$30</Typography>
                </Paper>
              </div>
            </CardMedia>
            <CardContent>
              <div className={classes.flexContainer}>
                <Typography variant="subtitle1">Trim</Typography>
                <Typography variant="subtitle2" className={classes.time}>
                  <AccessTime />
                  {' '}
                  30 min
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary" component="p">
                This is a description of what this service is.
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => history.push('/book')}
              >
                Book Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Services;
