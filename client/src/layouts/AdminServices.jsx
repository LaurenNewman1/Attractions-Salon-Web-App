
import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, CircularProgress, Button, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
} from '@material-ui/core';
import {
  AddCircle,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import useStyles from '../css/EditServiceStyles';
import EditService from '../components/EditService';
import fetchServicesByType from '../stores/ServicesStore';

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
  const [errorBody, setErrorBody] = useState({});
  const [hasError, setHasError] = useState(false);
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
    console.log(_id);
    if (successful) {
      console.log('service updated');
      console.log('params', params);
      window.location.reload(false);
    }
    window.location.reload(false);
  };
  const attemptDelete = async (_id) => {
    // eslint-disable-next-line max-len
    const successful = await deleteService(_id);
    if (successful) {
      console.log('service deleted!');
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
    // eslint-disable-next-line max-len
    addAddon();
    const [successful, errors] = await addService(name, type, subtype, price, time, description, banner, addons);
    setErrorBody({});
    setHasError(!successful);
    if (successful) {
      console.log(addonName);
      console.log('new service added');
      // const response = await addService(name, type, subtype, price, time, description, banner, addons);
      console.log(addons);
    } else {
      setErrorBody(errors);
    }
    console.log(errorBody, hasError);
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
    <Page>
      {loading ? <CircularProgress className={classes.loading} />
        : (
          <div className={classes.root}>
            <div className={classes.container}>
              <h1 className={classes.pageHead}>
                Services
              </h1>
              <IconButton className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
                <AddCircle />
              </IconButton>
            </div>
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
            <Typography variant="h4" className={classes.header}>Nails</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!nails.length ? null
                : nails.map((service) => (
                  <EditService service={service} deleteService={(_id) => attemptDelete(_id)} changeService={(_id, params) => renderSavedPage(_id, params)} />
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Wax</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!wax.length ? null
                : wax.map((service) => (
                  //   <Grid item xs={6} sm={6} md={3}>
                  <EditService service={service} deleteService={(_id) => attemptDelete(_id)} changeService={(_id, params) => renderSavedPage(_id, params)} />
                  //   </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Cuts</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!cuts.length ? null
                : cuts.map((service) => (
                //   <Grid item xs={12} sm={6} md={3}>
                  <EditService service={service} deleteService={(_id) => attemptDelete(_id)} changeService={(_id, params) => renderSavedPage(_id, params)} />
                //   </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Dyes</Typography>
            <Grid
              container
              spacing={3}
              className={classes.container}
              deleteService={() => attemptDelete()}
            >
              {!dyes.length ? null
                : dyes.map((service) => (
                //   <Grid item xs={12} sm={6} md={3}>
                  <EditService service={service} deleteService={(_id) => attemptDelete(_id)} changeService={(_id, params) => renderSavedPage(_id, params)} />
                //   </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Treatment</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!treatments.length ? null
                : treatments.map((service) => (
                //   <Grid item xs={12} sm={6} md={3}>
                  <EditService service={service} deleteService={(_id) => attemptDelete(_id)} changeService={(_id) => renderSavedPage(_id)} />
                //   </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Wash/Dry</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!washes.length ? null
                : washes.map((service) => (
                //   <Grid item xs={12} sm={6} md={3}>
                  <EditService service={service} deleteService={(_id) => attemptDelete(_id)} changeService={(_id) => renderSavedPage(_id)} />
                //   </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Styling</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!stylings.length ? null
                : stylings.map((service) => (
                //   <Grid item xs={12} sm={6} md={3}>
                  <EditService service={service} deleteService={(_id) => attemptDelete(_id)} changeService={(_id) => renderSavedPage(_id)} />
                //   </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Extensions</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!extensions.length ? null
                : extensions.map((service) => (
                //   <Grid item xs={12} sm={6} md={3}>
                  <EditService service={service} deleteService={(_id) => attemptDelete(_id)} changeService={(_id) => renderSavedPage(_id)} />
                //   </Grid>
                ))}
            </Grid>
          </div>
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
