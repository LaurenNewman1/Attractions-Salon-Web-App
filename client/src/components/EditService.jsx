
import React, { useState } from 'react';
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

  const cancelChanges = () => {
    console.log('viewing name', baseState.name);
    updateService(group, index, ['name', viewing.name]);
    setOpen(false);
  };
  useEffect(() => {
    setViewing(service);
    console.log('viewing', viewing);
  }, []);
  const handleClickOpenPanel = () => {
    if (open === false) {
      console.log('viewing', viewing);
      setOpen(!open);
    } else {
      cancelChanges();
      setOpen(!open);
    }

  };
  // const cancelChanges = (i) => {
  //   updateService(group, i, ['name', viewing.name]);
  //   setOpen(false);
  // };

  // const expandChange = (panel) => (event, isExpanded) => {
  //   // cancel any previously closed ones
  //   // if (open !== false) {
  //   //   cancelChanges(panel);
  //   // }
  //   // save history on newly opened ones
  //   if (isExpanded) {
  //     setViewing({ service });
  //     console.log('viewing', viewing);
  //   } else { // cancel if closing
  //     cancelChanges(panel);
  //   }
  //   setOpen(isExpanded ? panel : false);
  // };
  // const expandChange = () => (event, isExpanded) => {
  //   // cancel any previously closed ones
  //   if (open !== false) {
  //     cancelChanges(open);
  //   }
  //   // save history on newly opened ones
  //   if (isExpanded) {
  //     setViewing({ service });
  //     console.log('viewing', viewing);
  //   } else { // cancel if closing
  //     cancelChanges(p, panel);
  //   }
  //   console.log('viewing', viewing);
  //   setOpen(isExpanded ? panel : false);
  // };

  return (
    <ExpansionPanel>
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
                        <DialogTitle>New Service</DialogTitle>
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
                            Save
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
                    {!addons.length ? null
                      : addons.map((currentAddon) => (
                        <TableRow key={currentAddon._id}>
                          <TableCell component="th" scope="row">
                            <TextField
                              value={currentAddon.name}
                              onChange={(e) => {
                                const addonname = e.target.value;
                                setAddons([...addons].map((object) => {
                                  if (object._id === currentAddon._id) {
                                    return {
                                      ...object,
                                      name: addonname,
                                    };
                                  } return object;
                                }));
                              }}
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
                              value={currentAddon.price}
                              onChange={(e) => {
                                const addonprice = e.target.value;
                                setAddons([...addons].map((object) => {
                                  if (object._id === currentAddon._id) {
                                    return {
                                      ...object,
                                      price: addonprice,
                                    };
                                  } return object;
                                }));
                              }}
                              // onChange={(e) => setAddonPrice(Number(e.target.value))}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

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
