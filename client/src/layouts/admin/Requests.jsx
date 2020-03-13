import React from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import Event from '@material-ui/icons/Event';
import moment from 'moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Page from '../../components/Page';

import useRequests from '../../stores/RequestStores';

const Requests = () => {
  const [requests, usedServices, loading] = useRequests();

  console.log(loading);

  const loadingSpinner = <CircularProgress />;

  const requestCards = requests.map((request) => (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {request.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Requested {request.dateOrdered.fromNow()}
        </Typography>
        <DateTimePicker
          disablePast
          label="Appointment Date and Time"
          value={request.appointmentDatetime}
          onChange={() => {}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Event />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ));

  return (
    <Page>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Typography
          align="center"
          variant="h4"
          display="block"
          gutterBottom
        >
          Requested Bookings
        </Typography>
        {loading ? loadingSpinner : requestCards}
      </MuiPickersUtilsProvider>
    </Page>
  );
};

export default Requests;
