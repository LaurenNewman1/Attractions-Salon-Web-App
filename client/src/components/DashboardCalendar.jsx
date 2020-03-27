import React from 'react';
import PropTypes from 'prop-types';
import { format, setHours, isSameHour, startOfWeek, isSameDay, eachDayOfInterval, addDays } from 'date-fns';
import { Paper, Grid, Card, CardContent, Typography } from '@material-ui/core';

const AppointmentCard = ({ appointment }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle1">
        {appointment.name}
      </Typography>
    </CardContent>
  </Card>
);

const HourColumns = ({
  numOfHours,
  startingHour,
  day,
  appointments,
}) => {
  const hours = [...Array(numOfHours).keys()].map((i) => startingHour + i);
  const dayAppointments = appointments.filter((a) => isSameDay(day, a.time));
  return hours.map((hour) => {
    const hourAsDate = setHours(day, hour);
    const hourAppointments = dayAppointments.filter((a) => isSameHour(hourAsDate, a.time));
    const cards = hourAppointments.map((app) => <AppointmentCard appointment={app} />);
    return (
      <Grid
        container
        item
        xs
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
      >
        <Paper style={{ height: '100%', margin: '5px', padding: '8px' }}>
          <Typography variant="caption" style={{ margin: '2px' }}>
            {format(hourAsDate, 'h aa')}
          </Typography>
          {cards}
        </Paper>
      </Grid>
    );
  });
};

const DashboardCalendar = ({
  numOfDays,
  startingHour,
  hoursPerDay,
  beginningOfWeek,
  appointments,
}) => {
  const days = eachDayOfInterval({ start: beginningOfWeek, end: addDays(beginningOfWeek, numOfDays - 1) });

  const dayColumns = days.map((day) => (
    <Grid
      container
      item
      xs={3}
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignItems="stretch"
        style={{ height: '20px', marginTop: '30px' }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {format(day, 'EEE do')}
        </Typography>
      </Grid>
      <HourColumns
        numOfHours={hoursPerDay}
        startingHour={startingHour}
        day={day}
        appointments={appointments}
      />
    </Grid>
  ));

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      style={{ height: 'calc(150vh - 96px)' }}
    >
      {dayColumns}
    </Grid>
  );
};

const APPOINTMENT_SHAPE = PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
  phone_number: PropTypes.string,
  confirmed: PropTypes.bool,
  time: PropTypes.instanceOf(Date),
  services: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      addons: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ),
    }),
  ),
  specialist: PropTypes.string,
  notes: PropTypes.string,
});

AppointmentCard.propTypes = {
  appointment: APPOINTMENT_SHAPE.isRequired,
};

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
