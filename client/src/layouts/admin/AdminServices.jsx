/* eslint-disable max-len */

import React, { useState, useEffect } from 'react';
import {
  Typography, Button, TextField, Fab, InputAdornment,
  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import {
  Add, Schedule, AttachMoney,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Alert, { TYPE_SUCCESS, TYPE_ERROR } from '../../components/Alert';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import useStyles from '../../css/EditServiceStyles';
import EditService from '../../components/EditService';
import NewService from '../../components/NewService';
import fetchServicesByType from '../../stores/ServicesStore';
import useServices from '../../stores/ServiceActionsStore';
import Confirm from '../../components/Confirm';

const adminServices = ({ addService, deleteService, changeService }) => {
  const classes = useStyles();

  const [confirmDelete, setConfirmDelete] = useState(false);
  // const [fullSets, setFullSets] = useState([]);
  // const [fills, setFills] = useState([]);
  // const [manicures, setManicures] = useState([]);
  // const [pedicures, setPedicures] = useState([]);
  // const [wax, setWax] = useState([]);
  // const [cuts, setCuts] = useState([]);
  // const [dyes, setDyes] = useState([]);
  // const [treatments, setTreatments] = useState([]);
  // const [washes, setWashes] = useState([]);
  // const [stylings, setStylings] = useState([]);
  // const [extensions, setExtensions] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [dialog, setDialog] = useState(false);

  const [services, services2, services3, services4,
    services5, services6, services7, services8, services9,
    services10, services11, newService, loading, updateReviews,
    updateNewReview, deleteReview, addReview, saveReview] = useServices();
  // const [name, setName] = useState('');
  // const [type, setType] = useState('');
  // const [subtype, setSubType] = useState('');
  // const [price, setPrice] = useState('');
  // const [time, setTime] = useState('');
  // const [description, setDescription] = useState('');
  // const [banner, setBanner] = useState('');
  // const [addonPrice, setAddonPrice] = useState('');
  // const [addonName, setAddonName] = useState('');
  // const [addons, setAddons] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };


  // const renderSavedPage = async (_id, params) => {
  //   const successful = await changeService(_id, params);
  //   if (successful) {
  //     window.location.reload(false);
  //   }
  //   window.location.reload(false);
  // };
  // const attemptDelete = async (_id) => {
  //   const successful = await deleteService(_id);
  //   if (successful) {
  //     window.location.reload(false);
  //   }
  // };


  // const attemptRegister = async () => {
  //   const lowerType = type.toLowerCase();
  //   addAddon();
  //   if (!name.length || !type.length || !description.length) {
  //     setAlert({ open: true, type: TYPE_ERROR, text: 'Please complete required fields.' });
  //   } else if (lowerType !== 'hair' && lowerType !== 'nails' && lowerType !== 'wax') {
  //     setAlert({ open: true, type: TYPE_ERROR, text: 'Valid types are hair, nails, or wax.' });
  //   } else {
  //     handleClose();
  //     await addService(name, lowerType, subtype, price,
  //       time, description, banner, addons);
  //   }
  // };


  const [groupName, setGroupName] = useState([]);
  const [asdf, setasdf] = useState('');
  const onClickAdd = async () => {
    setOpen(false);
    const success = await addReview();
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Review added successfully.' : 'Failed to add review.',
    });
  };

  const setDelete = (asd, group, _id) => {
    setGroupName(group);
    setasdf(asd);
    console.log(_id);
    setConfirmDelete(_id);
  };

  const onClickDelete = async (_id) => {
    setConfirmDelete(false);
    setOpen(false);
    console.log(groupName);
    const success = await deleteReview(asdf, groupName, _id);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Review deleted successfully.' : 'Deletion failed.',
    });
  };

  const onClickSave = async (group, index) => {
    const success = await saveReview(group, index);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Review saved successfully.' : 'Save failed.',
    });
    setOpen(false);
  };

  return (
    <Page maxWidth="md">
      {loading ? <Loading /> : null}
      <Typography
        className={classes.pageHead}
        align="center"
        variant="h4"
        display="block"
        gutterBottom
      >
        <div style={{ width: 40 }} />
        Services
        <NewService onClickAdd={onClickAdd} addService={addService} setAlert={setAlert} updateNewService={updateNewReview} />
      </Typography>
      <Typography variant="h5" className={classes.header}>Hair Cuts</Typography>
      {!services.length ? null
        : services.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services, index)}
            updateService={updateReviews}
            group={services}
            asdf="services"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Hair Dyes</Typography>
      {!services2.length ? null
        : services2.map((service, index) => (
          <EditService
            service={service}
            index={index}
            // deleteService={() => setConfirmDelete(index)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services2}
            asdf="services2"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Hair Treatment</Typography>
      {!services3.length ? null
        : services3.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services3}
            asdf="services3"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Hair Wash/Dry</Typography>
      {!services4.length ? null
        : services4.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services4}
            asdf="services4"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Hair Styling</Typography>
      {!services5.length ? null
        : services5.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services5}
            asdf="services5"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Hair Extensions</Typography>
      {!services6.length ? null
        : services6.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services6}
            asdf="services6"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Full Sets</Typography>
      {!services7.length ? null
        : services7.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services7}
            asdf="services7"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Fills</Typography>
      {!services8.length ? null
        : services8.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services8}
            asdf="services8"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Manicures</Typography>
      {!services9.length ? null
        : services9.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services9}
            asdf="services9"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Pedicures</Typography>
      {!services10.length ? null
        : services10.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services10}
            asdf="services10"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Wax</Typography>
      {!services11.length ? null
        : services11.map((service, index) => (
          <EditService
            service={service}
            index={index}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateReviews}
            group={services11}
            asdf="services11"
          />
        ))}

      {confirmDelete
        ? (
          <Confirm
            open={confirmDelete !== false}
            content="Clicking delete will permanently remove this review."
            confirmText="Delete"
            onConfirm={() => onClickDelete(groupName[confirmDelete]._id)}
            onCancel={() => setConfirmDelete(false)}
          />
        ) : null}
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
