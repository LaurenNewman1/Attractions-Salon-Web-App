import React, { useState } from 'react';
import moment from 'moment';
import {
  Button, Typography, Card, CardActions, CardContent, IconButton,
  InputAdornment, TextField, Chip, InputLabel, CardHeader,
  Select, MenuItem, Input, FormControl, Grid,
} from '@material-ui/core';
import {
  Phone, Email,
} from '@material-ui/icons';
import Event from '@material-ui/icons/Event';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import useStyles from '../../css/RequestsStyles';
import useRequests from '../../stores/RequestStores';
import Alert, { TYPE_SUCCESS, TYPE_ERROR } from '../../components/Alert';
import Confirm from '../../components/Confirm';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Requests = () => {
  const [requests, services, specialists, loading,
    updateRequests, confirm, deleteRequest] = useRequests();
  const [deleting, setDeleting] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });
  const classes = useStyles();

  const validateConfirm = async (index) => {
    const req = requests[index];
    if (req.name.length && Date.parse(req.time) > Date.now()) {
      const success = await confirm(index);
      setAlert({
        open: true,
        type: success ? TYPE_SUCCESS : TYPE_ERROR,
        text: success ? 'Appointment confirmed.' : 'Confirmation failed.',
      });
    } else {
      setAlert({
        open: true,
        type: TYPE_ERROR,
        text: 'Some entries are incomplete or invalid.',
      });
    }
  };

  const onClickDelete = async (index) => {
    setDeleting(false);
    const success = await deleteRequest(index);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Request deleted successfully.' : 'Deletion failed.',
    });
  };

  const requestCards = requests.length ? requests.map((request, index) => {
    const serviceDetails = services.find((s) => s._id === request.service);
    console.log('specialist.specialties', specialists);

    return (
      <Card className={classes.card}>
        <CardHeader
          title={request.name}
          subheader={`Requested ${moment(request.timeOrdered).fromNow()}`}
          action={request.payInStore
            ? <Typography className={classes.payInStore}>PAY IN STORE</Typography>
            : null}
          style={{ paddingBottom: 0 }}
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
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
                value={Date.parse(request.time)}
                onChange={(date) => updateRequests(index, ['time', date.toISOString()])}
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
              <FormControl style={{ width: '100%', marginTop: 10 }}>
                <InputLabel>Specialist</InputLabel>
                <Select
                  value={request.specialist}
                  onChange={(e) => updateRequests(index, ['specialist', e.target.value])}
                >
                  {specialists.map((specialist) => {
                    if (specialist.specialties) {
                      if (specialist.specialties.find((s) => s === serviceDetails.type
                      || s === serviceDetails.subtype)) {
                        return (
                          <MenuItem key={specialist._id} value={specialist._id}>
                            {specialist.name}
                          </MenuItem>
                        );
                      }
                    }
                    return null;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel>Service</InputLabel>
                <Select
                  value={request.service}
                  onChange={(e) => updateRequests(index, ['service', e.target.value])}
                >
                  {services.map((serv) => (
                    <MenuItem key={serv._id} value={serv._id}>
                      {serv.name}
                      {' '}
                      ($
                      {serv.price}
                      )
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: '100%', marginTop: 10 }}>
                <InputLabel>Add-ons</InputLabel>
                <Select
                  multiple
                  value={request.addons}
                  onChange={(e) => updateRequests(index, ['addons', e.target.value])}
                  input={<Input />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => ( // Problems: cannot remove addons from customer
                        <Chip
                          key={value._id}
                          label={value.name}
                          className={classes.chip}
                          size="small"
                          color="secondary"
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {services.find((s) => s._id === request.service)
                    ? services.find((s) => s._id === request.service).addons.map((add) => (
                      <MenuItem key={add.name} value={add}>
                        {add.name}
                        {' '}
                        ($
                        {add.price}
                        )
                      </MenuItem>
                    )) : null}
                </Select>
              </FormControl>
              <TextField
                style={{ width: '100%', marginTop: 10 }}
                label="Notes"
                multiline
                value={request.notes}
                onChange={(e) => updateRequests(index, ['notes', e.target.value])}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => setDeleting(index)}>Delete</Button>
          <Button
            style={{ marginLeft: 'auto' }}
            variant="contained"
            color="primary"
            onClick={() => validateConfirm(index)}
          >
            Confirm
          </Button>
        </CardActions>
      </Card>
    );
  }) : <Typography variant="subtitle1" className={classes.none}>No pending requests.</Typography>;

  return (
    <Page maxWidth="md">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div style={{ paddingTop: 5 }}>
          <h1
            align="center"
            display="block"
            gutterBottom
          >
            Requested Bookings
          </h1>
        </div>
        {loading ? <Loading /> : null}
        {requestCards}
        {deleting
          ? (
            <Confirm
              open={deleting !== false}
              title={`Delete ${requests[deleting].name}'s request?`}
              content="Clicking delete will permanently remove this request."
              confirmText="Delete"
              onConfirm={() => onClickDelete(deleting)}
              onCancel={() => setDeleting(false)}
            />
          ) : null}
        <Alert
          open={alert.open}
          type={alert.type}
          text={alert.text}
          onClose={() => setAlert({ open: false, type: '', text: '' })}
        />
      </MuiPickersUtilsProvider>
    </Page>
  );
};

export default Requests;
