import React, { useState } from 'react';
import {
  Button,
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
  Grid,
} from '@material-ui/core';
import {
  Delete, Check, Phone, Email,
} from '@material-ui/icons';
import Event from '@material-ui/icons/Event';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Page from '../../components/Page';
import Loading from '../../components/Loading';

import useRequests from '../../stores/RequestStores';

const Requests = () => {
  const [requests, usedServices, loading, addAddon, deleteAddon] = useRequests();
  const [addonCreate, setAddonCreate] = useState([]);

  const setAddon = (requestIndex, addonIndex) => {
    const addonClone = [...addonCreate];
    addonClone[requestIndex] = addonIndex;
    setAddonCreate(addonClone);
  };

  console.log(addonCreate);
  console.log(requests);

  const requestCards = !loading ? requests.map((request, index) => (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">{request.name}</Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary" gutterBottom>
              Requested {request.dateOrdered.fromNow()}
            </Typography>
            <Typography color="textSecondary" gutterBottom style={{ display: 'flex', alignItems: 'center ', marginTop: 10 }}>
              <Phone color="primary" /> {request.phone_number}
            </Typography>
            <Typography color="textSecondary" gutterBottom style={{ display: 'flex', alignItems: 'center ', marginTop: 10 }}>
              <Email color="primary" /> {request.email}
            </Typography>
            <DateTimePicker
              style={{ width: '100%', marginTop: 10 }}
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
            <TextField
              style={{ width: '100%', marginTop: 10 }}
              label="Notes"
              multiline
              value={request.notes}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ width: '100%', marginTop: 10 }}
              label="Main Service"
              value={usedServices[request.service].name}
            />
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
                      <TableCell>{addon.name}</TableCell>
                      <TableCell>${addon.price}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          aria-label="delete"
                          onClick={() => deleteAddon(index, addonIndex)}
                        >
                          <Delete />
                        </IconButton>
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
                    <IconButton
                      size="small"
                      aria-label="save"
                      color="primary"
                      onClick={() => {
                        addAddon(index, addonCreate[index]);
                        setAddon(index, -1);
                      }}
                    >
                      <Check />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained">Delete</Button>
        <Button style={{ marginLeft: 'auto' }} variant="contained" color="primary">Confirm</Button>
      </CardActions>
    </Card>
  )) : null;

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
        {loading ? <Loading /> : requestCards}
      </MuiPickersUtilsProvider>
    </Page>
  );
};

export default Requests;
