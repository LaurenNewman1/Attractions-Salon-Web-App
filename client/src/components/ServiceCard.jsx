import React from 'react';
import {
  Typography, Card, CardMedia, CardContent, CardActions, Button, Paper,
} from '@material-ui/core';
import {
  AccessTime,
} from '@material-ui/icons';
import {
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from '../css/ServiceStyles';

const ServiceCard = ({ service }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card>
      <CardMedia component="image" image={service.banner} className={classes.media}>
        <div className={classes.price}>
          <Paper className={classes.pricePaper}>
            <Typography variant="body2">
              $
              {service.price}
            </Typography>
          </Paper>
        </div>
      </CardMedia>
      <CardContent>
        <div className={classes.flexContainer}>
          <Typography variant="subtitle1" noWrap>{service.name}</Typography>
          <Typography variant="subtitle2" className={classes.time}>
            <AccessTime />
            {' '}
            {service.time}
            {' '}
            min
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.truncateOverflow}
        >
          {service.description}
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
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    time: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    subType: PropTypes.string,
    addons: PropTypes.array,
  }).isRequired,
};


export default ServiceCard;
