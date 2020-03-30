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

const serviceCategoryLUT = {
  'hair/cut': 'Hair Cuts',
  'hair/dye': 'Hair Dyes',
  'hair/treatment': 'Hair Treatment',
  'hair/wash': 'Hair Wash/Dry',
  'hair/styling': 'Hair Styling',
  'hair/extension': 'Hair Extensions',
  'nails/full set': 'Full Sets',
  'nails/fills': 'Fills',
  'nails/manicure': 'Manicures',
  'nails/pedicure': 'Pedicures',
  wax: 'Wax',
};

const adminServices = () => {
  const classes = useStyles();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [
    services,
    loading,
    addService,
    modifyService,
    updateService,
    deleteService,
    deleteAddon,
  ] = useServices();
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });
  const [deleteCandidate, setDeleteCandidate] = useState({});

  const onClickAdd = async (service) => {
    setOpen(false);
    const success = await addService(service);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Service added successfully.' : 'Failed to add service.',
    });
  };

  const onDeleteAddon = async (service, addonIndex) => {
    const success = await deleteAddon(service, addonIndex);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Addon deleted.' : 'Failed to delete addon.',
    });
  };

  const clearDelete = () => {
    setDeleteCandidate({});
    setConfirmDelete(false);
  };

  const setDelete = (service) => {
    setDeleteCandidate(service);
    setConfirmDelete(true);
  };

  const enactDelete = async () => {
    setConfirmDelete(false);
    const success = await deleteService(deleteCandidate);
    setDeleteCandidate({});
    setOpen(false);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Service deleted successfully.' : 'Deletion failed.',
    });
  };

  const onClickSave = async (service) => {
    const success = await updateService(service);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Service saved successfully.' : 'Save failed.',
    });
  };


  const serviceSection = (types) => types.map((key) => {
    const categoryServices = services[key];
    return (
      !categoryServices || !categoryServices.length ? null
        : (
          <>
            <Typography variant="h5" className={classes.header}>{serviceCategoryLUT[key]}</Typography>
            {categoryServices.map((service, index) => (
              <EditService
                service={service}
                index={index}
                open={open}
                deleteService={() => setDelete(service)}
                deleteAddon={(serv, addonIndex) => onDeleteAddon(serv, addonIndex)}
                changeService={(committedService) => onClickSave(committedService)}
                updateService={(committedService) => modifyService(committedService)}
                group={services}
                asdf="services"
              />
            ))}
          </>
        )
    );
  });

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
          onClickAdd={(service) => onClickAdd(service)}
        />
      </Typography>
      {serviceSection(Object.keys(serviceCategoryLUT))}
      {confirmDelete
        ? (
          <Confirm
            open={confirmDelete}
            content="Clicking delete will permanently remove this service."
            confirmText="Delete"
            onConfirm={() => enactDelete()}
            onCancel={() => clearDelete()}
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
