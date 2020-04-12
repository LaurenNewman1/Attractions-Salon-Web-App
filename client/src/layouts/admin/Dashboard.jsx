import React, { useState } from 'react';
import { parseISO, isEqual } from 'date-fns';
import {
  DialogActions, DialogContent, DialogTitle, Dialog, Button, DialogContentText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import DashboardCalendar from '../../components/DashboardCalendar';
import useRequests from '../../stores/RequestStores';
import useBooking from '../../stores/BookStore';
import Calendar from '../Calendar';
import Details from '../Details';


const EMPTY_CLIENT_INFO = {
  name: '',
  email: '',
  phone_number: '',
  time: new Date().toISOString(),
};

const EMPTY_REQUEST = {
  confirmed: true,
  timeOrdered: new Date(Date.now()).toISOString(),
  service: '',
  addons: [],
  specialist: '',
  notes: '',
  payInStore: true,
};

const Dashboard = ({ userData }) => {
  const [
    requests,
    services,
    specialists,
    loading,
    updateRequests,
    confirm,
    deleteRequest,
    refreshBookings,
  ] = useRequests(false);
  const [bookingLoading, bookingSpecialists, bookingServices, sendRequest] = useBooking();
  const [clientInfo, setClientInfo] = useState(EMPTY_CLIENT_INFO);
  const [requestInfo, setRequstInfo] = useState(EMPTY_REQUEST);
  const [openCreateBooking, setOpenBooking] = useState(false);
  const [bookingEditCandidate, setEditCandidate] = useState(-1);

  const submitNewAppointment = async () => {
    const fullAppointment = { ...clientInfo, ...requestInfo };
    const [success, res] = await sendRequest(fullAppointment);
    if (success) {
      setClientInfo(EMPTY_CLIENT_INFO);
      setRequstInfo(EMPTY_REQUEST);
      refreshBookings();
      setOpenBooking(false);
    } else {
      console.log(res);
    }
  };

  const updateBooking = (state, setFunc, ...argus) => {
    const newFields = { ...state };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setFunc(newFields);
  };

  let formedAppointments = requests.map((r) => ({
    ...r,
    time: parseISO(r.time),
    service: services.find((s) => s._id === r.service),
    specialist: specialists.find((s) => s._id === r.specialist),
  }));

  if (userData.role === 1) {
    formedAppointments = formedAppointments.filter((appt) => {
      if (!appt.specialist || appt.specialist.name === userData.name) {
        return true;
      }
      return false;
    });
  }

  if (loading) {
    return (<Page />);
  }

  const toolbarButtons = [
    {
      name: 'Create Booking',
      onClick: () => setOpenBooking(true),
      color: 'primary',
    },
  ];

  const newEditCandidate = (startDate) => {
    console.log(startDate);
    const bookingI = requests.findIndex((r) => startDate.toISOString() === r.time);
    setEditCandidate(bookingI);
  };

  const unconfirmCandidate = async () => {
    if (await confirm(bookingEditCandidate, false)) {
      setEditCandidate(-1);
      refreshBookings();
    }
  };

  return (
    <Page>
      <div style={{ padding: '32px' }}>
        <DashboardCalendar
          appointments={formedAppointments}
          buttons={toolbarButtons}
          OnButtonPress={(i) => toolbarButtons[i].onClick()}
          editAppointment={(appointmentData) => newEditCandidate(appointmentData.startDate)}
        />
      </div>

      <Dialog
        open={openCreateBooking}
        fullWidth
        maxWidth="md"
        onClose={() => setOpenBooking(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create a new Booking</DialogTitle>
        <DialogContent>
          <Calendar
            booking={clientInfo}
            updateBooking={(...argus) => updateBooking(clientInfo, setClientInfo, ...argus)}
            loading={bookingLoading}
            lazyStateUpdate
            compact
          />
          <Details
            booking={requestInfo}
            updateBooking={(...argus) => updateBooking(requestInfo, setRequstInfo, ...argus)}
            loading={bookingLoading}
            specialists={bookingSpecialists}
            services={bookingServices}
            compact
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => submitNewAppointment()} color="primary" autoFocus>
            Create Booking
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={bookingEditCandidate !== -1}
        onClose={() => setEditCandidate(-1)}
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to edit this appointment?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Editing appointments requires them to be reconfirmed before appearing on the Dashboard calendar. Reconfirming will send the client an additional confirmation email. Are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCandidate(-1)} color="primary">
            Cancel Edit
          </Button>
          <Button onClick={() => unconfirmCandidate()} color="primary" autoFocus>
            Edit Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

Dashboard.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
};

Dashboard.defaultProps = {
  userData: null,
};


export default Dashboard;
