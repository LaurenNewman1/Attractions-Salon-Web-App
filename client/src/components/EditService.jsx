
import React from 'react';
import {
  ExpansionPanel, Grid,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography, TextField, Button, InputAdornment, DialogActions,
} from '@material-ui/core';
import {
  ExpandMore, AttachMoney, Schedule,
} from '@material-ui/icons';
// import {
//   useHistory,
// } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddOnTable from './AddOnTable';
import useStyles from '../css/EditServiceStyles';

const EditService = ({
  index, service, deleteService, cancelChanges, changeService,
  updateService, group, asdf, open, setOpen,
}) => {
  const classes = useStyles();
  const [name, setName] = React.useState(service.name);
  const [type, setType] = React.useState(service.type);
  const [subtype, setSubType] = React.useState(service.subtype);
  const [time, setTime] = React.useState(service.time);
  const [price, setPrice] = React.useState(service.price);
  const [description, setDescription] = React.useState(service.description);
  const [addons, setAddons] = React.useState(service.addons);

  const renderSavedPage = () => {
    updateService(group, index, ['addons', addons]);
    changeService(service._id, {
      name,
      type: type.toLowerCase(),
      subtype,
      time,
      price,
      description,
      addons,
    });
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const updateAddonName = (e, i) => {
    addons[i].name = e;
  };

  const updateAddonPrice = (e, i) => {
    addons[i].price = e;
  };

  return (
    <ExpansionPanel expanded={open === index} onChange={setOpen(index)}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        {open !== index
          ? (<Typography>{service.name}</Typography>
          )
          : (
            <TextField
              onClick={(e) => handleClick(e)}
              onChange={(e) => updateService(group, index, ['name', e.target.value])}
              value={service.name}
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
              value={service.type}
              onChange={(e) => updateService(group, index, ['type', e.target.value])}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="SubType"
              style={{ width: '100%' }}
              value={service.subtype}
              onChange={(e) => updateService(group, index, ['subtype', e.target.value])}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Price"
              style={{ width: '100%' }}
              value={service.price}
              onChange={(e) => updateService(group, index, ['price', Number(e.target.value)])}
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
              value={service.time}
              onChange={(e) => updateService(group, index, ['time', Number(e.target.value)])}
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
              onChange={(e) => updateService(group, index, ['description', e.target.value])}
              multiline
              style={{ width: '100%' }}
              label="Description"
              value={service.description}
            />
          </Grid>
          <Grid item xs={12} className={classes.tablediv}>
            <AddOnTable
              updateAddonName={updateAddonName}
              updateAddonPrice={updateAddonPrice}
              addon={addons}
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
        <Button variant="contained" color="primary" onClick={() => renderSavedPage()}>
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
