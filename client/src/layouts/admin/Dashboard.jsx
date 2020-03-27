import React from 'react';
import Page from '../../components/Page';
import DashboardCalendar from '../../components/DashboardCalendar';

const MOCK_APPOINTMENTS = [
  {
    name: 'Jane Doe',
    email: 'test@gmail.com',
    phone_number: '9413741788',
    confirmed: false,
    time: new Date(2020, 2, 25, 12),
    services: [
      {
        name: 'Hair Dye',
        addon: [
          {
            name: 'Hair Cut',
          },
        ],
      },
    ],
  },
];

const Dashboard = () => (
  <Page>
    <div style={{ paddingTop: '32px' }}>
      <DashboardCalendar
        appointments={MOCK_APPOINTMENTS}
      />
    </div>
  </Page>
);

export default Dashboard;
