/* eslint-disable max-len */

import React from 'react';
import {
  ExpansionPanel,
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

const EditService = ({ service, deleteService, changeService }) => {
  const classes = useStyles();
  //   const history = useHistory();
  const [clicked, setClicked] = React.useState(true);
  // const [values, setValues] = service;
  const [name, setName] = React.useState(service.name);
  const [type, setType] = React.useState(service.type);
  const [subtype, setSubType] = React.useState(service.subtype);
  const [time, setTime] = React.useState(service.time);
  const [price, setPrice] = React.useState(service.price);
  const [description, setDescription] = React.useState(service.description);
  const [addons] = React.useState(service.addons);
  const [close, setClose] = React.useState(false);

  // console.log(service.addons);
  // const handleChange = (key, val) => {
  //   setValues({
  //     ...values,
  //     [key]: val,
  //   });
  //   console.log(val);
  // };

  const renderSavedPage = () => {
    changeService(service._id, {
      name,
      type,
      subtype,
      time,
      price,
      description,
      addons,
    });
  };
  const handleOpen = () => {
    setClicked(!clicked);
    if (close) {
      setClose(false);
    } else {
      setClose(true);
    }
  };

  const handleClose = () => {
    setClose(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  // const handleDelete = () => {
  //   console.log(service);
  // };
  const updateAddonName = (e, index) => {
    console.log('name value', e);
    addons[index].name = e;
  };
  const updateAddonPrice = (e, index) => {
    console.log('price value', e);
    addons[index].price = e;
  };
  //   const handleClose = () => {
  //       setClicked(false);
  //   }
  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={close}>
        <ExpansionPanelSummary
          onClick={handleOpen}
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {clicked
            ? (<Typography>{service.name}</Typography>
            )
            : (
              <TextField
                onClick={(e) => handleClick(e)}
                onChange={(e) => setName(e.target.value)}
                defaultValue={service.name}
                className={classes.heading}
                style={{ border: '5px' }}
              />
            ) }
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form className={classes.textfield} autoComplete="off">
            <TextField id="standard-basic" label="Type" defaultValue={service.type} onChange={(e) => setType(e.target.value)} />
            <TextField id="standard-basic" label="SubType" defaultValue={service.subtype} onChange={(e) => setSubType(e.target.value)} />
            <TextField
              id="standard-basic"
              label="Price"
              defaultValue={service.price}
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
              id="standard-basic"
              label="Time"
              defaultValue={service.time}
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
            <TextField id="outlined-multiline-static" onChange={(e) => setDescription(e.target.value)} multiline style={{ width: '88%', paddingBottom: '20px' }} label="Description" defaultValue={service.description} />
            <div className={classes.tablediv}>
              {!service.addons.length ? null
                : service.addons.map((addon, index) => (
                  <AddOnTable className={classes.table} updateAddonName={updateAddonName} updateAddonPrice={updateAddonPrice} label="Addons" index={index} addon={addon} />
                ))}
            </div>
          </form>
        </ExpansionPanelDetails>
        <DialogActions>
          {/* <Button variant="contained" color="grey" onClick={() => deleteService()}>
            Delete
          </Button> */}
          <Button variant="contained" color="grey" onClick={() => deleteService(service._id)}>
            Delete
          </Button>
          <div style={{ flex: '1 0 0' }} />
          <Button variant="contained" onClick={handleClose} color="grey">
            Cancel
          </Button>
          {/* <Button variant="contained" color="primary" onClick={() => changeService(service._id, service)}>
            Save
          </Button> */}
          <Button variant="contained" color="primary" onClick={() => renderSavedPage()}>
            Save
          </Button>
        </DialogActions>
      </ExpansionPanel>
    </div>
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
  changeService: PropTypes.func.isRequired,
};


export default EditService;
