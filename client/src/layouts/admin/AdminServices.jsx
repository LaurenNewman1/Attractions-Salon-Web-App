/* eslint-disable max-len */

import React, { useState } from 'react';
import {
  Typography,
} from '@material-ui/core';
import Alert, { TYPE_SUCCESS, TYPE_ERROR } from '../../components/Alert';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import useStyles from '../../css/EditServiceStyles';
import EditService from '../../components/EditService';
import NewService from '../../components/NewService';
import useServices from '../../stores/ServiceActionsStore';
import Confirm from '../../components/Confirm';

const adminServices = () => {
  const classes = useStyles();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState({});
  const [services, services2, services3, services4,
    services5, services6, services7, services8, services9,
    services10, services11,, loading, updateServices,
    updateNewService, deleteService, addService, saveService] = useServices();

  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });
  const [serviceGroup, setServiceGroup] = useState([]);
  const [serviceGroupName, setServiceGroupName] = useState('');

  const onClickAdd = async () => {
    setOpen(false);
    const success = await addService();
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Service added successfully.' : 'Failed to add review.',
    });
  };

  const setDelete = (serviceGName, serviceG, _id) => {
    setServiceGroup(serviceG);
    setServiceGroupName(serviceGName);
    console.log(_id);
    setConfirmDelete(_id);
  };

  const onClickDelete = async (_id) => {
    setConfirmDelete(false);
    setOpen(false);
    // console.log(groupName);
    const success = await deleteService(serviceGroupName, serviceGroup, _id);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Service deleted successfully.' : 'Deletion failed.',
    });
  };

  const onClickSave = async (group, index) => {
    const success = await saveService(group, index);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Service saved successfully.' : 'Save failed.',
    });
    setOpen(false);
  };

  // const cancelChanges = (group, index) => {
  //   updateServices(group, index, ['name', 'potatos']);
  //   setOpen(false);
  // };

  // const expandChange = (group, panel) => (event, isExpanded) => {
  //   // cancel any previously closed ones
  //   if (open !== false) {
  //     cancelChanges(open);
  //   }
  //   // save history on newly opened ones
  //   if (isExpanded) {
  //     setViewing({ ...services[panel] });
  //   } else { // cancel if closing
  //     cancelChanges(group, panel);
  //   }
  //   console.log('viewing', viewing);
  //   setOpen(isExpanded ? panel : false);
  // };

  return (
    <Page maxWidth="md">
      {loading ? <Loading disableShrink /> : null}
      <Typography
        className={classes.pageHead}
        align="center"
        variant="h4"
        display="block"
        gutterBottom
      >
        <div style={{ width: 40 }} />
        Services
        <NewService
          onClickAdd={onClickAdd}
          updateNewService={updateNewService}
        />
      </Typography>
      <Typography variant="h5" className={classes.header}>Hair Cuts</Typography>
      {!services.length ? null
        : services.map((service, index) => (
          <EditService
            service={service}
            index={index}
            open={open}
            // setOpen={(group, panel) => expandChange(group, panel)}
            // cancelChanges={() => cancelChanges()}
            deleteService={setDelete}
            changeService={() => onClickSave(services, index)}
            updateService={updateServices}
            group={services}
            asdf="services"
          />
        ))}

      {/* <Typography variant="h5" className={classes.header}>Hair Dyes</Typography>
      {!services2.length ? null
        : services2.map((service, index) => (
          <EditService
            service={service}
            index={index}
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
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
            open={open}
            setOpen={(panel) => expandChange(panel)}
            deleteService={setDelete}
            changeService={() => onClickSave(services2, index)}
            updateService={updateServices}
            group={services11}
            asdf="services11"
          />
        ))} */}

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

export default adminServices;
