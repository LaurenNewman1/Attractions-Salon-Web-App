/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { startOfWeek, addDays, addHours } from 'date-fns';
import { Paper, Grid, Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ListAlt, Person, Notes } from '@material-ui/icons';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
});

const TooptipContent = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        <Person className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.specialist.name}</span>
      </Grid>
    </Grid>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        <Notes className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.notes}</span>
      </Grid>
    </Grid>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        <ListAlt className={classes.icon} />
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.service.name}</span>
      </Grid>
    </Grid>
    <Grid container alignItems="center">
      {appointmentData.addons.map((addon) => (
        <Grid key={addon._id} item xs={4}>
          <Chip label={addon.name} />
        </Grid>
      ))}
    </Grid>
  </AppointmentTooltip.Content>
));

const DashboardCalendar = ({
  numOfDays,
  startingHour,
  hoursPerDay,
  beginningOfWeek,
  appointments,
}) => {
  const appointmentEvents = appointments.map((a) => (
    {
      startDate: a.time,
      endDate: addHours(a.time, 1),
      title: a.name,
      specialist: a.specialist,
      service: a.service,
      addons: a.addons,
      notes: a.notes,
    }
  ));

  const daysWorked = [...Array(numOfDays).keys()].map((i) => i + beginningOfWeek.getDay());
  const excludedDays = [...Array(7).keys()].filter((i) => !daysWorked.includes(i));

  return (
    <Paper>
      <Scheduler
        data={appointmentEvents}
      >
        <ViewState
          currentDate={new Date()}
        />
        <WeekView
          startDayHour={startingHour}
          endDayHour={startingHour + hoursPerDay}
          excludedDays={excludedDays}
          cellDuration={30}
        />
        <Appointments />
        <AppointmentTooltip
          showCloseButton
          contentComponent={TooptipContent}
        />
        <AppointmentForm
          readOnly
        />
      </Scheduler>
    </Paper>
  );
};

const APPOINTMENT_SHAPE = PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
  phone_number: PropTypes.string,
  confirmed: PropTypes.bool,
  time: PropTypes.instanceOf(Date),
  service: PropTypes.shape({
    name: PropTypes.string,
    addons: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
  specialist: PropTypes.shape({
    name: PropTypes.string,
  }),
  notes: PropTypes.string,
});

DashboardCalendar.propTypes = {
  numOfDays: PropTypes.number,
  beginningOfWeek: PropTypes.instanceOf(Date),
  startingHour: PropTypes.number,
  hoursPerDay: PropTypes.number,
  appointments: PropTypes.arrayOf(APPOINTMENT_SHAPE).isRequired,
};

DashboardCalendar.defaultProps = {
  numOfDays: 4,
  startingHour: 10,
  hoursPerDay: 9,
  beginningOfWeek: addDays(startOfWeek(new Date()), 2),
};

export default DashboardCalendar;
