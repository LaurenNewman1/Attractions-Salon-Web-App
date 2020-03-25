
import React, { useState, useEffect } from 'react';
import {
  Typography, Button, TextField, Fab,
  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import {
  Add,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import useStyles from '../../css/EditServiceStyles';
import EditService from '../../components/EditService';
import fetchServicesByType from '../../stores/ServicesStore';

const adminServices = ({ addService, deleteService, changeService }) => {
  const classes = useStyles();

  const [nails, setNails] = useState([]);
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
    addAddon();
    await addService(name, type, subtype, price,
      time, description, banner, addons);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setNails(await fetchServicesByType('nails'));
      setWax(await fetchServicesByType('wax'));
      setCuts(await fetchServicesByType('cuts'));
      setDyes(await fetchServicesByType('dyes'));
      setTreatments(await fetchServicesByType('treatments'));
      setWashes(await fetchServicesByType('washes'));
      setStylings(await fetchServicesByType('stylings'));
      setExtensions(await fetchServicesByType('extensions'));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Page maxWidth="md">
      <Typography
        className={classes.pageHead}
        align="center"
        variant="h4"
        display="block"
        gutterBottom
      >
        <div style={{ width: 40 }} />
        Services
        <Fab color="primary" aria-label="add" size="small" onClick={handleClickOpen}>
          <Add />
        </Fab>
      </Typography>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Service</DialogTitle>
        <DialogContent>
          <form className={classes.textfield} autoComplete="off">
            <TextField onChange={(e) => setName(e.target.value)} id="standard-basic" label="Name" />
            <TextField onChange={(e) => setType(e.target.value)} id="standard-basic" label="Type" />
            <TextField onChange={(e) => setSubType(e.target.value)} id="standard-basic" label="subType" />
            <TextField onChange={(e) => setPrice(e.target.value)} id="standard-basic" label="Price" />
            <TextField onChange={(e) => setTime(e.target.value)} id="standard-basic" label="Time" />
            <TextField onChange={(e) => setBanner(e.target.value)} id="standard-basic" label="Banner" />
            <TextField onChange={(e) => setAddonName(e.target.value)} id="standard-basic" label="AddonName" />
            <TextField onChange={(e) => setAddonPrice(e.target.value)} id="standard-basic" label="AddonPrice" />
            <TextField
              onClick={addAddon}
              onChange={(e) => setDescription(e.target.value)}
              id="outlined-multiline-static"
              multiline
              style={{ width: '88%' }}
              label="Description"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => attemptRegister()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {loading ? <Loading />
        : (
          <>
            <Typography variant="h4" className={classes.header}>Nails</Typography>
            {!nails.length ? null
              : nails.map((service) => (
                <EditService
                  service={service}
                  deleteService={(_id) => attemptDelete(_id)}
                  changeService={(_id, params) => renderSavedPage(_id, params)}
                />
              ))}
            <Typography variant="h4" className={classes.header}>Wax</Typography>
            {!wax.length ? null
              : wax.map((service) => (
                <EditService
                  service={service}
                  deleteService={(_id) => attemptDelete(_id)}
                  changeService={(_id, params) => renderSavedPage(_id, params)}
                />
              ))}
            <Typography variant="h4" className={classes.header}>Hair Cuts</Typography>
            {!cuts.length ? null
              : cuts.map((service) => (
                <EditService
                  service={service}
                  deleteService={(_id) => attemptDelete(_id)}
                  changeService={(_id, params) => renderSavedPage(_id, params)}
                />
              ))}
            <Typography variant="h4" className={classes.header}>Hair Dyes</Typography>
            {!dyes.length ? null
              : dyes.map((service) => (
                <EditService
                  service={service}
                  deleteService={(_id) => attemptDelete(_id)}
                  changeService={(_id, params) => renderSavedPage(_id, params)}
                />
              ))}
            <Typography variant="h4" className={classes.header}>Hair Treatment</Typography>
            {!treatments.length ? null
              : treatments.map((service) => (
                <EditService
                  service={service}
                  deleteService={(_id) => attemptDelete(_id)}
                  changeService={(_id) => renderSavedPage(_id)}
                />
              ))}
            <Typography variant="h4" className={classes.header}>Hair Wash/Dry</Typography>
            {!washes.length ? null
              : washes.map((service) => (
                <EditService
                  service={service}
                  deleteService={(_id) => attemptDelete(_id)}
                  changeService={(_id) => renderSavedPage(_id)}
                />
              ))}
            <Typography variant="h4" className={classes.header}>Hair Styling</Typography>
            {!stylings.length ? null
              : stylings.map((service) => (
                <EditService
                  service={service}
                  deleteService={(_id) => attemptDelete(_id)}
                  changeService={(_id) => renderSavedPage(_id)}
                />
              ))}
            <Typography variant="h4" className={classes.header}>Hair Extensions</Typography>
            {!extensions.length ? null
              : extensions.map((service) => (
                <EditService
                  service={service}
                  deleteService={(_id) => attemptDelete(_id)}
                  changeService={(_id) => renderSavedPage(_id)}
                />
              ))}
          </>
        )}
    </Page>
  );
};


adminServices.propTypes = {
  addService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  changeService: PropTypes.func.isRequired,
};

export default adminServices;
