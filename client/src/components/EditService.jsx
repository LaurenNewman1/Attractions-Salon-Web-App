
import React, { useState } from 'react';
import {
  ExpansionPanel, Grid,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography, TextField, Button, InputAdornment, DialogActions,
} from '@material-ui/core';
import {
  ExpandMore, AttachMoney, Schedule,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import AddOnTable from './AddOnTable';
import useStyles from '../css/EditServiceStyles';

const EditService = ({
  index, service, deleteService, cancelChanges, changeService,
  updateService, group, asdf, open,
}) => {
  const classes = useStyles();

  const [localService, setLocalService] = useState(service);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const updateAddonName = (e, i) => {
    const newService = { ...service };
    newService.addons[i].name = e;
    updateService(newService);
  };

  const updateAddonPrice = (e, i) => {
    const newService = { ...service };
    newService.addons[i].price = e;
    updateService(newService);
  };

  const updateServiceArg = (name, val) => {
    const newService = { ...localService };
    newService[name] = val;
    setLocalService(newService);
  };

  const commitService = () => {
    changeService(localService);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        {open !== index
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
            <AddOnTable
              updateAddonName={(e, i) => updateAddonName(e, i)}
              updateAddonPrice={(e, i) => updateAddonPrice(e, i)}
              addon={localService.addons}
            />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <DialogActions>
        <Button variant="contained" color="grey" onClick={() => deleteService(asdf, group, index)}>
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
  cancelChanges: PropTypes.func.isRequired,
  changeService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  group: PropTypes.array.isRequired,
  asdf: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};


export default EditService;
