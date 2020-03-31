import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Grid,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from '../css/CalendarStyles';
import Loading from '../components/Loading';

const Calendar = ({ booking, updateBooking, loading }) => {
  const classes = useStyles();

  const disableWeekends = (date) => date.getDay() === 0
                                  || date.getDay() === 1
                                  || date.getDay() === 6;

  const changeDateTime = (dateTime) => {
    updateBooking(['time', dateTime.toISOString()]);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {loading ? <Loading /> : null}
      <h2 className={classes.header}>Schedule your appointment!</h2>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            required
            label="Name"
            className={classes.textfield}
            value={booking.name}
            onChange={(event) => updateBooking(['name', event.target.value])}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            className={classes.textfield}
            value={booking.email}
            onChange={(event) => updateBooking(['email', event.target.value])}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Phone Number"
            className={classes.textfield}
            value={booking.phone_number}
            onChange={(event) => updateBooking(['phone_number', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            className={classes.textfield}
            margin="normal"
            label="Date"
            format="MM/dd/yyyy"
            shouldDisableDate={(date) => disableWeekends(date)}
            disablePast
            value={Date.parse(booking.time)}
            onChange={(date) => changeDateTime(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TimePicker
            className={classes.textfield}
            margin="normal"
            label="Time"
            minutesStep="5"
            value={Date.parse(booking.time)}
            onChange={(time) => changeDateTime(time)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

Calendar.propTypes = {
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
  updateBooking: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Calendar;
