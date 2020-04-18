/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { startOfWeek, addDays, addHours } from 'date-fns';
import {
  Paper, Grid, Chip, Button, IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  ListAlt, Person, Notes, Edit,
} from '@material-ui/icons';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  chip: {
    backgroundColor: palette.secondary.main,
  },
  chipGrid: {
    textAlign: 'center',
  },
});

const ToolTipHeader = withStyles(style, { name: 'Header' })(({
  children, appointmentData, classes, onEditClick, ...restProps
}) => (
  <AppointmentTooltip.Header
    {...restProps}
    appointmentData={appointmentData}
  >
    <IconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => onEditClick()}
    >
      <Edit />
    </IconButton>
  </AppointmentTooltip.Header>
));

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
    <Grid container alignItems="stretch">
      {appointmentData.addons.map((addon) => (
        <Grid key={addon._id} item xs={3} className={classes.chipGrid}>
          <Chip className={classes.chip} label={addon.name} />
        </Grid>
      ))}
    </Grid>
  </AppointmentTooltip.Content>
));

const ToolBarContents = ({ children }) => (
  <Toolbar.Root>
    {children}
  </Toolbar.Root>
);

ToolBarContents.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

const DashboardCalendar = ({
  numOfDays,
  startingHour,
  hoursPerDay,
  beginningOfWeek,
  appointments,
  buttons,
  OnButtonPress,
  editAppointment,
}) => {
  const appointmentEvents = appointments.map((a) => (
    {
      startDate: a.time,
      endDate: addHours(a.time, 1),
      title: a.name + (a.payInStore ? '\n[PAY IN STORE]' : ''),
      specialist: a.specialist,
      service: a.service,
      addons: a.addons,
      notes: a.notes,
    }
  ));

  const daysWorked = [...Array(numOfDays).keys()].map((i) => i + beginningOfWeek.getDay());
  const excludedDays = [...Array(7).keys()].filter((i) => !daysWorked.includes(i));

  const mappedButtons = buttons.map(({ name, color }, i) => (
    <Button key={name} color={color} variant="contained" onClick={() => OnButtonPress(i)}>{name}</Button>
  ));

  const allToolBarChildren = [
    ...mappedButtons,
  ];

  return (
    <Paper>
      <Scheduler
        data={appointmentEvents}
      >
        <ViewState
          defaultCurrentDate={new Date()}
        />
        <WeekView
          startDayHour={startingHour}
          endDayHour={startingHour + hoursPerDay}
          excludedDays={excludedDays}
          cellDuration={30}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ToolBarContents>{allToolBarChildren}</ToolBarContents>
        <Appointments />
        <AppointmentTooltip
          headerComponent={(props) => <ToolTipHeader onEditClick={() => editAppointment(props.appointmentData)} {...props} />}
          contentComponent={TooptipContent}
          showCloseButton
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

const BUTTON_SHAPE = PropTypes.shape({
  name: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
});

DashboardCalendar.propTypes = {
  numOfDays: PropTypes.number,
  beginningOfWeek: PropTypes.instanceOf(Date),
  startingHour: PropTypes.number,
  hoursPerDay: PropTypes.number,
  appointments: PropTypes.arrayOf(APPOINTMENT_SHAPE).isRequired,
  buttons: PropTypes.arrayOf(BUTTON_SHAPE),
  OnButtonPress: PropTypes.func.isRequired,
  editAppointment: PropTypes.func.isRequired,
};

DashboardCalendar.defaultProps = {
  numOfDays: 4,
  startingHour: 10,
  hoursPerDay: 9,
  beginningOfWeek: addDays(startOfWeek(new Date()), 2),
  buttons: [],
};

export default DashboardCalendar;
