import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, Typography, CardContent,
} from '@material-ui/core';
import {
  Rating,
} from '@material-ui/lab';
import ReviewData from '../reviews.json';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    marginBottom: 20,
    minHeight: 225,
    background: 'linear-gradient(180deg, #ffc1e3 26.82%, rgba(173, 126, 115, 0) 26.83%, #e7e7e7 26.83%)',
  },
  bullet: {
    display: 'inline-block',
    // margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    // marginBottom: 12,
    height: '100%',
    marginTop: 5,
  },
});

const Review = () => {
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;
  return (
    <div style={{ columns: '2 auto', marginTop: 25 }}>
      {/* style={{ display: 'flex', margin: '10px' }} */}
      {/* <Grid container spacing={3}>
        <Grid item xs={6}> */}
      {ReviewData.map((reviewDetail) => (
        <div>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2" style={{ paddingBottom: 15 }}>
                {reviewDetail.name}
              </Typography>
              <Rating name="read-only" value="5" readOnly />
              <Typography className={classes.pos} color="textSecondary">
                {reviewDetail.content}
              </Typography>
              {/* <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
              </Typography> */}
            </CardContent>

          </Card>
        </div>
      ))}
      {/* </Grid> */}
      {/* </Grid> */}
    </div>
  );
};

export default Review;
