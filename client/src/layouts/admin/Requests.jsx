import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  InputLabel,
  Select,
  MenuItem,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Event from '@material-ui/icons/Event';
import moment from 'moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Page from '../../components/Page';

import useRequests from '../../stores/RequestStores';

const Requests = () => {
  const [requests, usedServices, loading, addAddon, deleteAddon] = useRequests();
  const [addonCreate, setAddonCreate] = useState([]);

  const setAddon = (requestIndex, addonIndex) => {
    const addonClone = [...addonCreate];
    addonClone[requestIndex] = addonIndex;
    setAddonCreate(addonClone);
  };

  console.log(loading);

  const loadingSpinner = <CircularProgress />;

  console.log(addonCreate);

  const requestCards = requests.map((request, index) => (
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
        <Typography variant="subtitle1" component="h5" style={{ marginTop: '1em' }}>
          Services
        </Typography>
        <TextField disabled label="Main Service" value={usedServices[request.service].name} />
        <Typography variant="subtitle2" component="h5" style={{ marginTop: '1em' }}>
          Addons
        </Typography>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {request.addons.map((addonIndex) => {
              console.log(usedServices);
              const addon = usedServices[request.service].addons[addonIndex];
              return (
                <TableRow key={addonIndex}>
                  <TableCell>
                    {addon.name}
                  </TableCell>
                  <TableCell>
                    {addon.price}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => deleteAddon(index, addonIndex)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>
                <InputLabel shrink>
                  Add an Addon
                </InputLabel>
                <Select
                  autoWidth
                  displayEmpty
                  style={{ width: '100%' }}
                  value={addonCreate[index]}
                  onChange={(e) => setAddon(index, e.target.value)}
                >
                  {request.addons.map((addonIndex) => {
                    const addon = usedServices[request.service].addons[addonIndex];
                    return <MenuItem value={addonIndex}>{addon.name}</MenuItem>;
                  })}
                </Select>
              </TableCell>
              <TableCell>
                {
                  addonCreate[index] && addonCreate[index] !== -1
                    ? usedServices[request.service].addons[addonCreate[index]].price
                    : null
                }
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => {
                    addAddon(index, addonCreate[index]);
                    setAddon(index, -1);
                  }}
                >
                  Create
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Button>Delete</Button>
        <Button style={{ marginLeft: 'auto' }}>Confirm</Button>
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
