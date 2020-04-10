import React, { useState } from 'react';
import { parseISO } from 'date-fns';
import { DialogActions, DialogContent, DialogTitle, Dialog, Button } from '@material-ui/core';
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

const Dashboard = () => {
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

  const formedAppointments = requests.map((r) => ({
    ...r,
    time: parseISO(r.time),
    service: services.find((s) => s._id === r.service),
    specialist: specialists.find((s) => s._id === r.specialist),
  }));

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

  return (
    <Page>
      <div style={{ padding: '32px' }}>
        <DashboardCalendar
          appointments={formedAppointments}
          buttons={toolbarButtons}
          OnButtonPress={(i) => toolbarButtons[i].onClick()}
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
    </Page>
  );
};

export default Dashboard;
