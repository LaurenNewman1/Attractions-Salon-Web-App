import React from 'react';
import PropTypes from 'prop-types';
import { startOfWeek, addDays, addHours } from 'date-fns';
import { Paper } from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

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
