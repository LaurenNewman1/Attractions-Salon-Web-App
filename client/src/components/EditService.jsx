/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import {
  ExpansionPanel, Grid, Fab, Dialog, DialogTitle, DialogContent,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography, TextField, Button, InputAdornment, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper,
} from '@material-ui/core';
import {
  ExpandMore, AttachMoney, Schedule, Add,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from '../css/EditServiceStyles';

const EditService = ({
  index, service, deleteService, changeService,
  updateService, group, asdf,
}) => {
  const classes = useStyles();
  const [openAddon, setOpenAddon] = React.useState(false);
  const [newAddonName, setNewAddonName] = React.useState('');
  const [newAddonPrice, setNewAddonPrice] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [localService, setLocalService] = useState(service);


  const handleClickOpen = () => {
    setOpenAddon(true);
  };

  const handleClose = () => {
    setOpenAddon(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const updateAddonName = (e, i) => {
    // const newService = { ...service };
    localService.addons[i].name = e;
    updateService(localService);
  };

  const updateAddonPrice = (e, i) => {
    // const newService = { ...service };
    localService.addons[i].price = e;
    updateService(localService);
  };

  const updateServiceArg = (name, val) => {
    const newService = { ...localService };
    newService[name] = val;
    setLocalService(newService);
  };

  const commitService = () => {
    updateService(localService);
    changeService(localService);
    setOpen(false);
  };

  const newService = { ...service };
  const newAddon = (e) => {
    e.preventDefault();
    setOpenAddon(false);
    const newAddonNameV = newAddonName;
    const newAddonPriceV = newAddonPrice;
    const nAddon = { name: newAddonNameV, price: newAddonPriceV };
    updateServiceArg('addons', [...localService.addons, nAddon]);
    updateService(localService);
    // changeService(localService);
  };
  const cancelChanges = () => {
    setLocalService(newService);
    updateService(newService);
    setOpen(false);
  };
  useEffect(() => {
    setLocalService(newService);
  }, [open]);
  const handleClickOpenPanel = () => {
    setOpen(!open);
  };

  return (
    <ExpansionPanel expanded={open} onChange={handleClickOpenPanel}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        {!open
          ? (<Typography>{service.name}</Typography>
          )
          : (
            <TextField
              onClick={(e) => handleClick(e)}
              onChange={(e) => updateServiceArg('name', e.target.value)}
              value={localService.name}
              className={classes.heading}
              style={{ border: '5px' }}
            />
          ) }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2} className={classes.textfield}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Type"
              style={{ width: '100%' }}
              value={localService.type}
              onChange={(e) => updateServiceArg('type', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Subtype"
              style={{ width: '100%' }}
              value={localService.subtype}
              onChange={(e) => updateServiceArg('subtype', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Price"
              style={{ width: '100%' }}
              value={localService.price}
              onChange={(e) => updateServiceArg('price', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Time"
              style={{ width: '100%' }}
              value={localService.time}
              onChange={(e) => updateServiceArg('time', e.target.value)}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => updateServiceArg('description', e.target.value)}
              multiline
              style={{ width: '100%' }}
              label="Description"
              value={localService.description}
            />
          </Grid>
          <Grid item xs={12} className={classes.tablediv}>

            <div className={classes.table}>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <h3 style={{ paddingLeft: '10px' }}>
                        Addons
                        <Fab style={{ marginLeft: 10 }} color="primary" size="small" onClick={handleClickOpen}>
                          <Add />
                        </Fab>
                      </h3>

                      <Dialog open={openAddon} onClose={handleClose}>
                        <DialogTitle>New Addon</DialogTitle>
                        <DialogContent>
                          <form className={classes.textfield}>
                            <TextField onChange={(e) => setNewAddonName(e.target.value)} label="Addon Name" />
                            <TextField onChange={(e) => setNewAddonPrice(e.target.value)} label="Addon Price" />
                          </form>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button onClick={(e) => newAddon(e)} color="primary" variant="contained">
                            Add
                          </Button>
                        </DialogActions>
                      </Dialog>

                    </TableRow>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!localService.addons.length ? null
                      : localService.addons.map((add, i) => (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            <TextField
                              value={add.name}
                              onChange={(e) => updateAddonName(e.target.value, i)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AttachMoney />
                                  </InputAdornment>
                                ),
                              }}
                              value={add.price}
                              onChange={(e) => updateAddonPrice(Number(e.target.value), i)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <DialogActions>
        <Button variant="contained" color="grey" onClick={async () => { await deleteService(asdf, group, index); setOpen(false); }}>
          Delete
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button onClick={() => cancelChanges()}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => commitService()}>
          Save
        </Button>
      </DialogActions>
    </ExpansionPanel>
  );
};

EditService.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    time: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    subtype: PropTypes.string,
    addons: PropTypes.array,
  }).isRequired,
  deleteService: PropTypes.func.isRequired,
  // cancelChanges: PropTypes.func.isRequired,
  changeService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  group: PropTypes.array.isRequired,
  asdf: PropTypes.string.isRequired,
  // open: PropTypes.bool.isRequired,
  // setOpen: PropTypes.func.isRequired,
};


export default EditService;
