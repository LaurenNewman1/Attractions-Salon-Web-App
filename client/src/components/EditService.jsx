
import React from 'react';
import {
  ExpansionPanel, Table, TableBody, TableContainer, TableRow, TableCell, TableHead,
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
  index, service, deleteService, changeService, updateService, group, asdf,
}) => {
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
  const [addons, setAddons] = React.useState(service.addons);

  const onAddon = (i) => {
    console.log(i);
    addons.map((el, index1) => ((index1 === i) ? console.log(index1) : console.log('not found')));
  };

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

  const handleOpen = () => {
    setClicked(!clicked);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };
  const updateAddonName = (e, i) => {
    console.log('name value', e);
    addons[i].name = e;
  };
  const updateAddonPrice = (e, i) => {
    console.log('price value', e);
    addons[i].price = e;
  };
  // const updateAddonName = (e, indexAdd) => {
  //   console.log('name value', e);
  //   // console.log(addons[indexAdd].name);
  //   console.log('addon index', indexAdd);
  //   updateService(index, ['addons', [{ name: e }]]);
  // };
  // const updateAddonPrice = (e, indexAdd) => {
  //   console.log('price value', e);
  // };

  // const updateAddons = (index, name, price) => {
  //   console.log('index', index, 'name', name, 'price', price);
  //   updateService(index, )
  // }
  return (
    <ExpansionPanel>
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
              onChange={(e) => updateService(group, index, ['name', e.target.value])}
              defaultValue={service.name}
              className={classes.heading}
              style={{ border: '5px' }}
            />
          ) }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form className={classes.textfield} autoComplete="off">
          <TextField id="standard-basic" label="Type" defaultValue={service.type} onChange={(e) => updateService(group, index, ['type', e.target.value])} />
          <TextField id="standard-basic" label="SubType" defaultValue={service.subtype} onChange={(e) => updateService(group, index, ['subtype', e.target.value])} />
          <TextField
            id="standard-basic"
            label="Price"
            defaultValue={service.price}
            onChange={(e) => updateService(group, index, ['price', Number(e.target.value)])}
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
          <TextField id="outlined-multiline-static" onChange={(e) => updateService(group, index, ['description', e.target.value])} multiline style={{ width: '88%', paddingBottom: '20px' }} label="Description" defaultValue={service.description} />
          <div className={classes.tablediv}>
            {/* <TableContainer>
              <Table size="small" aria-label="a dense table"> */}
            {/* <TableContainer>
              {' '}
              <TableHead>
                <TableRow><h3 style={{ paddingLeft: '10px' }}>Addons</h3></TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
            </TableContainer> */}

            {/* <TableBody>
                  {!service.addons.length ? null
                    : service.addons.map((addon, i) => (
                      <TableRow key={service.addons.name}>
                        <TableCell component="th" scope="row"> */}
            {/* <TextField defaultValue={addon.name} onClick={() => onAddon(i)} onChange={(e) => updateService(index, ['addons', [{ name: e.target.value }]])} /> */}
            {/* <TextField defaultValue={addon.name} onClick={() => onAddon(i)} onChange={(e) => updateAddonName(e.target.value, i)} />
                        </TableCell> */}
            {/* <TableCell><AttachMoney /></TableCell> */}
            {/* <TableCell>
                          <TextField
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AttachMoney />
                                </InputAdornment>
                              ),
                            }}
                            defaultValue={addon.price}
                            onClick={() => onAddon(i)}
                            onChange={(e) => updateAddonPrice(e.target.value, i)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer> */}
            {/* {!service.addons.length ? null
              : service.addons.map((addon, i) => ( */}
            <AddOnTable className={classes.table} service={service} updateAddonName={updateAddonName} updateAddonPrice={updateAddonPrice} label="Addons" addon={addons} />
            {/* ))} */}
          </div>
        </form>
      </ExpansionPanelDetails>
      <DialogActions>
        <Button variant="contained" color="grey" onClick={() => deleteService(asdf, group, index)}>
          Delete
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button>
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
  changeService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  group: PropTypes.array.isRequired,
  asdf: PropTypes.string.isRequired,
};


export default EditService;
