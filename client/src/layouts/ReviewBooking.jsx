import React, { useState } from 'react';
import {
  TextField, Card, CardMedia, Grid, CardActionArea,
  Button, IconButton, Icon, Typography, Divider, useTheme,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import hairIllustration from '../images/hairIllustration.png';
import useStyles from '../css/ReviewStyles';


const ReviewBooking = ({ booking }) => {
  const history = useHistory();
  const classes = useStyles();
  const [type, setType] = useState('');
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);

  const changeType = (newType) => {
    setType(newType);
  };


  // This is where you will be updating all the stuff on the backend
  const renderTextFields = () => {
    if (!editMode) {
      return (
        <div className={classes.information}>
          <div className={classes.spacing}>
            <Typography variant="h6" gutterBottom>
              Name:
            </Typography>
            <div className={classes.middleSpace} />
            <Typography variant="h6" gutterBottom>
              {booking.name}
            </Typography>
          </div>
          <div className={classes.spacing}>
            <Typography variant="h6" gutterBottom>
              Phone:
            </Typography>
            <div className={classes.middleSpace} />
            <Typography variant="h6" gutterBottom>
              {booking.phone_number}
            </Typography>
          </div>
          <div className={classes.spacing}>
            <Typography variant="h6" gutterBottom>
              Card:
            </Typography>
            <div className={classes.middleSpace} />
            <Typography variant="h6" gutterBottom>
              .... .... .... 1234
            </Typography>
          </div>
        </div>
      );
    }
    return (
      <div>
        <TextField style={{ paddingBottom: 10 }} defaultValue={booking.name} label="Name" value={textBoxValues.name} onChange={(e) => updateTextBoxValue('name', e.target.value)} />
        <br />
        <TextField style={{ paddingBottom: 10 }} defaultValue={booking.phone_number} label="Phone Number" value={textBoxValues.phone_number} onChange={(e) => updateTextBoxValue('phone_number', e.target.value)} />
        <br />
        <TextField defaultValue=".... .... .... 1234" label="Credit Card" />
      </div>
    );
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <h1>Review Booking</h1>
        {!editMode && (
          <IconButton onClick={() => setEditMode(true)}>
            <Icon>
              <EditIcon />
            </Icon>
          </IconButton>
        )}
      </div>
      {renderTextFields()}
      <div>
        <Divider variant="middle" style={{ flexGrow: 1 }} />
      </div>
      <div>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={4}>
            <Card
              className={classes.card}
              style={{ borderColor: type === 'hair' ? theme.palette.primary.main : 'transparent' }}
            >
              <CardActionArea onClick={() => changeType('hair')}>
                <CardMedia component="image" image={hairIllustration} className={classes.media} />
                <h5 className={classes.cardContent}>Hair</h5>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <div className={classes.spacing}>
              <Typography variant="h6" gutterBottom>
                HairCut:&nbsp;
              </Typography>
              <Typography variant="h6" gutterBottom>
                HairCut Name
              </Typography>
            </div>
            <div className={classes.spacing}>
              <Typography variant="h6" gutterBottom>
                Specialist:&nbsp;
              </Typography>
              <Typography variant="h6" gutterBottom>
                Specialist Name
              </Typography>
            </div>
            <div className={classes.spacing}>
              <Typography variant="h6" gutterBottom>
                Wednesday March 25, 1:00 - 1:30 P.M.
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div>
        <Divider variant="middle" style={{ flexGrow: 1 }} />
      </div>
      <div style={{ marginTop: 10 }}>
        <div className={classes.spacing}>
          <Typography variant="h6" gutterBottom>
            Subtotal:
          </Typography>
          <div className={classes.middleSpace} />
          <Typography variant="h6" gutterBottom>
            $$$
          </Typography>
        </div>
        <div className={classes.spacing}>
          <Typography variant="h6" gutterBottom>
            Tax:
          </Typography>
          <div className={classes.middleSpace} />
          <Typography variant="h6" gutterBottom>
            $$$
          </Typography>
        </div>
        <div className={classes.spacing}>
          <Typography variant="h5" gutterBottom>
            Total:
          </Typography>
          <div className={classes.middleSpace} />
          <Typography variant="h5" gutterBottom>
            $$$
          </Typography>
        </div>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/confirmation/${id}`)}
        >
          Request Appointment
        </Button>
      </div>
    </>
  );
};

ReviewBooking.propTypes = {
  booking: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    confirmed: PropTypes.bool,
    time: PropTypes.string,
    service: PropTypes.string,
    addons: PropTypes.array,
    specialist: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
};
export default ReviewBooking;
