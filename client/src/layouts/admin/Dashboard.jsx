import React from 'react';
import { parseISO } from 'date-fns';
import Page from '../../components/Page';
import DashboardCalendar from '../../components/DashboardCalendar';
import useRequests from '../../stores/RequestStores';

const Dashboard = () => {
  const [requests, services, specialists] = useRequests(false);
  const formedAppointments = requests.map((r) => ({
    ...r,
    time: parseISO(r.time),
    service: services.find((s) => s._id === r.service),
    specialist: specialists.find((s) => s._id === r.specialist),
  }));
  return (
    <Page>
      <div style={{ paddingTop: '32px' }}>
        <DashboardCalendar
          appointments={formedAppointments}
        />
      </div>
    </Page>
  );
};

export default Dashboard;
