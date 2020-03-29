
import React, { useState, useEffect } from 'react';
import {
  Typography, Button, TextField, Fab, InputAdornment,
  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import {
  Add, Schedule, AttachMoney,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Alert, { TYPE_ERROR } from '../../components/Alert';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import useStyles from '../../css/EditServiceStyles';
import EditService from '../../components/EditService';
import fetchServicesByType from '../../stores/ServicesStore';

const adminServices = ({ addService, deleteService, changeService }) => {
  const classes = useStyles();

  const [fullSets, setFullSets] = useState([]);
  const [fills, setFills] = useState([]);
  const [manicures, setManicures] = useState([]);
  const [pedicures, setPedicures] = useState([]);
  const [wax, setWax] = useState([]);
  const [cuts, setCuts] = useState([]);
  const [dyes, setDyes] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [washes, setWashes] = useState([]);
  const [stylings, setStylings] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [subtype, setSubType] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('');
  const [addonPrice, setAddonPrice] = useState('');
  const [addonName, setAddonName] = useState('');
  const [addons, setAddons] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const renderSavedPage = async (_id, params) => {
    const successful = await changeService(_id, params);
    if (successful) {
      window.location.reload(false);
    }
    window.location.reload(false);
  };
  const attemptDelete = async (_id) => {
    const successful = await deleteService(_id);
    if (successful) {
      window.location.reload(false);
    }
  };

  const addAddon = () => {
    setAddons([
      ...addons,
      {
        name: addonName,
        price: addonPrice,
      },
    ]);
    return addons;
  };

  const attemptRegister = async () => {
    const lowerType = type.toLowerCase();
    addAddon();
    if (!name.length || !type.length || !description.length) {
      setAlert({ open: true, type: TYPE_ERROR, text: 'Please complete required fields.' });
    } else if (lowerType !== 'hair' && lowerType !== 'nails' && lowerType !== 'wax') {
      setAlert({ open: true, type: TYPE_ERROR, text: 'Valid types are hair, nails, or wax.' });
    } else {
      handleClose();
      await addService(name, lowerType, subtype, price,
        time, description, banner, addons);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setFullSets(await fetchServicesByType('nails', 'full set'));
      setFills(await fetchServicesByType('nails', 'fills'));
      setManicures(await fetchServicesByType('nails', 'manicure'));
      setPedicures(await fetchServicesByType('nails', 'pedicure'));
      setWax(await fetchServicesByType('wax', ''));
      setCuts(await fetchServicesByType('hair', 'cut'));
      setDyes(await fetchServicesByType('hair', 'dye'));
      setTreatments(await fetchServicesByType('hair', 'treatment'));
      setWashes(await fetchServicesByType('hair', 'wash'));
      setStylings(await fetchServicesByType('hair', 'styling'));
      setExtensions(await fetchServicesByType('hair', 'extension'));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Page maxWidth="md">
      {loading ? <Loading /> : null}
      <div style={{ paddingTop: 5 }}>
        <h1
          className={classes.pageHead}
          align="center"
          display="block"
          gutterBottom
        >
          <div style={{ width: 40 }} />
          Services
          <Fab color="primary" aria-label="add" size="small" onClick={handleClickOpen}>
            <Add />
          </Fab>
        </h1>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new service</DialogTitle>
        <DialogContent>
          <form className={classes.textfield}>
            <TextField
              required
              onChange={(e) => setName(e.target.value)}
              className={classes.add}
              label="Name"
            />
            <TextField
              required
              onChange={(e) => setType(e.target.value)}
              className={classes.add}
              label="Type"
            />
            <TextField
              onChange={(e) => setSubType(e.target.value)}
              className={classes.add}
              label="subType"
            />
            <TextField
              label="Price"
              className={classes.add}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Time"
              className={classes.add}
              onChange={(e) => setTime(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Schedule />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography>mins</Typography>
                  </InputAdornment>
                ),
              }}
            />
            <TextField onChange={(e) => setBanner(e.target.value)} className={classes.add} label="Image" />
            <TextField onChange={(e) => setAddonName(e.target.value)} className={classes.add} label="AddonName" />
            <TextField onChange={(e) => setAddonPrice(e.target.value)} className={classes.add} label="AddonPrice" />
            <TextField
              required
              onClick={addAddon}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              style={{ width: '93%' }}
              label="Description"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => attemptRegister()} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h5" className={classes.header}>Hair Cuts</Typography>
      {!cuts.length ? null
        : cuts.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id, params) => renderSavedPage(_id, params)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Hair Dyes</Typography>
      {!dyes.length ? null
        : dyes.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id, params) => renderSavedPage(_id, params)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Hair Treatment</Typography>
      {!treatments.length ? null
        : treatments.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id) => renderSavedPage(_id)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Hair Wash/Dry</Typography>
      {!washes.length ? null
        : washes.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id) => renderSavedPage(_id)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Hair Styling</Typography>
      {!stylings.length ? null
        : stylings.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id) => renderSavedPage(_id)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Hair Extensions</Typography>
      {!extensions.length ? null
        : extensions.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id) => renderSavedPage(_id)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Wax</Typography>
      {!wax.length ? null
        : wax.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id, params) => renderSavedPage(_id, params)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Full Sets</Typography>
      {!fullSets.length ? null
        : fullSets.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id, params) => renderSavedPage(_id, params)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Fills</Typography>
      {!fills.length ? null
        : fills.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id, params) => renderSavedPage(_id, params)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Manicures</Typography>
      {!manicures.length ? null
        : manicures.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id, params) => renderSavedPage(_id, params)}
          />
        ))}
      <Typography variant="h5" className={classes.header}>Pedicures</Typography>
      {!pedicures.length ? null
        : pedicures.map((service) => (
          <EditService
            service={service}
            deleteService={(_id) => attemptDelete(_id)}
            changeService={(_id, params) => renderSavedPage(_id, params)}
          />
        ))}
      <Alert
        open={alert.open}
        type={alert.type}
        text={alert.text}
        onClose={() => setAlert({ open: false, type: '', text: '' })}
      />
    </Page>
  );
};


adminServices.propTypes = {
  addService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  changeService: PropTypes.func.isRequired,
};

export default adminServices;
