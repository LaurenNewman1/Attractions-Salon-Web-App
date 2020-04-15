/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState, memo } from 'react';
import {
  ExpansionPanel, Grid, Dialog, DialogTitle, DialogContent,
  ExpansionPanelSummary, FormControl, Select,
  ExpansionPanelDetails, InputLabel, MenuItem, DialogActions,
  Typography, TextField, Button, InputAdornment, ExpansionPanelActions,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton,
} from '@material-ui/core';
import {
  ExpandMore, AttachMoney, Schedule, Add, Delete,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from '../css/EditServiceStyles';
import Confirm from './Confirm';

const EditService = memo(({
  index, service, deleteService, changeService, types,
  updateService, group, asdf, deleteAddon,
}) => {
  const classes = useStyles();
  const [openAddon, setOpenAddon] = React.useState(false);
  const [newAddonName, setNewAddonName] = React.useState('');
  const [newAddonPrice, setNewAddonPrice] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [localService, setLocalService] = useState(service);
  const [delAddonWindow, setDelAddonWindow] = useState({
    open: false,
    addonIndex: -1,
  });

  const onClickDeleteAddon = () => {
    deleteAddon(service, delAddonWindow.addonIndex);
    setDelAddonWindow({ open: false, addonIndex: -1 });
  };

  const updateAddonName = async (e, i) => {
    localService.addons[i].name = e;
    updateService(localService);
  };

  const updateAddonPrice = async (e, i) => {
    localService.addons[i].price = e;
    updateService(localService);
  };

  const updateServiceArg = (...argus) => {
    const newFields = { ...localService };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setLocalService(newFields);
  };

  const commitService = async () => {
    const success = await changeService(localService);
    if (success) {
      setLocalService(localService);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const newService = { ...service };
  const newAddon = (e) => {
    e.preventDefault();
    setOpenAddon(false);
    const newAddonNameV = newAddonName;
    const newAddonPriceV = newAddonPrice;
    const nAddon = { name: newAddonNameV, price: newAddonPriceV };
    updateServiceArg(['addons', [...localService.addons, nAddon]]);
  };

  const cancelChanges = () => {
    setLocalService(newService);
    setOpen(false);
  };

  useEffect(() => {
    setLocalService(newService);
  }, [open]);

  return (
    <ExpansionPanel expanded={open} onChange={() => setOpen(!open)}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        {!open
          ? (<Typography>{service.name}</Typography>
          )
          : (
            <TextField
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => updateServiceArg(['name', e.target.value])}
              value={localService.name}
              className={classes.heading}
              style={{ border: '5px' }}
            />
          ) }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel>Type</InputLabel>
                  {Object.keys(types).length
                    ? (
                      <Select
                        value={localService.type || ''}
                        onChange={(e) => updateServiceArg(['type', e.target.value], ['subtype', ''])}
                      >
                        {Object.keys(types).map((type) => (
                          <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel>Subtype</InputLabel>
                  {Object.keys(types).length
                    ? (
                      <Select
                        value={localService.subtype || ''}
                        onChange={(e) => updateServiceArg(['subtype', e.target.value])}
                      >
                        {Object.keys(types).length
                          ? types[Object.keys(types).find(
                            (t) => t === localService.type,
                          )].map((sub) => (
                            <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                          )) : null}
                      </Select>
                    ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  style={{ width: '100%' }}
                  value={localService.price}
                  onChange={(e) => updateServiceArg(['price', e.target.value])}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Time"
                  style={{ width: '100%' }}
                  value={localService.time}
                  onChange={(e) => updateServiceArg(['time', e.target.value])}
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
                  onChange={(e) => updateServiceArg(['description', e.target.value])}
                  multiline
                  style={{ width: '100%' }}
                  label="Description"
                  value={localService.description}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={6}>
            <TableContainer component={Paper}>
              <h4 className={classes.addonsLbl}>
                Addons
                <IconButton color="primary" onClick={() => setOpenAddon(true)}>
                  <Add size="large" />
                </IconButton>
              </h4>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!localService.addons.length ? null
                    : localService.addons.map((add, i) => (
                      <TableRow key={i}>
                        <TableCell size="small" component="th" scope="row">
                          <TextField
                            value={add.name}
                            onChange={(e) => updateAddonName(e.target.value, i)}
                          />
                        </TableCell>
                        <TableCell size="small">
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
                        <TableCell size="small">
                          <IconButton onClick={() => setDelAddonWindow({
                            open: true, addonIndex: i,
                          })}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button variant="contained" onClick={async () => { await deleteService(asdf, group, index); setOpen(false); }}>
          Delete
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button onClick={() => cancelChanges()}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => commitService()}>Save</Button>
      </ExpansionPanelActions>
      {delAddonWindow.open
        ? (
          <Confirm
            open={delAddonWindow.open}
            title={`Delete the ${service.addons[delAddonWindow.addonIndex].name} addon?`}
            content="Clicking delete will permanently remove this addon."
            confirmText="Delete"
            onConfirm={() => onClickDeleteAddon()}
            onCancel={() => setDelAddonWindow({ open: false, addonIndex: -1 })}
          />
        ) : null}
      <Dialog open={openAddon} onClose={() => setOpenAddon(false)}>
        <DialogTitle>New Addon</DialogTitle>
        <DialogContent>
          <form className={classes.textfield}>
            <TextField onChange={(e) => setNewAddonName(e.target.value)} label="Name" />
            <TextField
              onChange={(e) => setNewAddonPrice(e.target.value)}
              label="Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddon(false)}>Cancel</Button>
          <Button onClick={(e) => newAddon(e)} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ExpansionPanel>
  );
});

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
  deleteAddon: PropTypes.func.isRequired,
  changeService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  group: PropTypes.object.isRequired,
  asdf: PropTypes.string.isRequired,
  types: PropTypes.shape({
    hair: PropTypes.array,
    wax: PropTypes.array,
    nails: PropTypes.array,
  }).isRequired,
};


export default EditService;
