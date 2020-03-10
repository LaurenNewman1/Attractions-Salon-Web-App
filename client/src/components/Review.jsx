import React from 'react';
import {
  Card, Typography, CardContent, Grid,
} from '@material-ui/core';
import {
  Rating,
} from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import useStyles from '../css/ContactStyles';

const Review = ({ review }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Rating value="5" readOnly icon={<FavoriteIcon color="primary" />} />
            <Typography variant="body2">{review.content}</Typography>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{review.name}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.profileImg}>
            <AccountCircle className={classes.icon} color="secondary" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Review;
