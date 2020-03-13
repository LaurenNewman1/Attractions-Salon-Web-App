import React from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import Page from '../../components/Page';

import useRequests from '../../stores/RequestStores';

const Requests = () => {
  const [requests, usedServices, loading] = useRequests();

  return (
    <Page>
      <Typography
        align="center"
        variant="h4"
        display="block"
        gutterBottom
      >
        Requested Bookings
      </Typography>
    </Page>
  );
};

export default Requests;
