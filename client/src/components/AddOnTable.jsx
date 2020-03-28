
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, InputAdornment,
} from '@material-ui/core';
import {
  AttachMoney,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
// import {
//   useHistory,
// } from 'react-router-dom';
import useStyles from '../css/EditServiceStyles';

const AddOnTable = ({
  addon, index, updateService, updateAddonName, updateAddonPrice, service,
}) => {
  const classes = useStyles();
  // const [price, setPrice] = React.useState(addon.price);
  // const [name, setName] = React.useState(addon.name);
  // const handleClick = (addons, index) => {

  //   console.log(addons.name);
  //   console.log(index);
  // };
  const handleChangeName = (e, i) => {
    console.log(e);
    updateAddonName(e, i);
  };
  const handleChangePrice = (e, i) => {
    console.log(e);
    updateAddonPrice(e, i);
  };
  // const updateServiceA = (e, indexAdd) => {
  //   console.log('name value', e);
  //   console.log('addon', addon);
  //   // console.log(addons[indexAdd].name);
  //   console.log('addon index', index);
  //   updateService(index, ['addons', [{ name: e }]]);
  // };
  const handleClick = () => {
    // console.log(addon.name);
    console.log(index);
  };
  // const handleChangeName = (e) => {
  //   console.log(e);
  //   updateAddonName(e, index);
  // };
  // const handleChangePrice = (e) => {
  //   console.log(e);
  //   updateAddonPrice(e, index);
  // };
  return (
    <div className={classes.table}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow><h3 style={{ paddingLeft: '10px' }}>Addons</h3></TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!addon.length ? null
              : addon.map((addons, i) => (
                <TableRow key={addons.name}>
                  <TableCell component="th" scope="row">
                    <TextField defaultValue={addons.name} onClick={() => handleClick()} onChange={(e) => handleChangeName(e.target.value, i)} />
                  </TableCell>
                  {/* <TableCell><AttachMoney /></TableCell> */}
                  <TableCell>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney />
                          </InputAdornment>
                        ),
                      }}
                      defaultValue={addons.price}
                      onClick={() => handleClick()}
                      onChange={(e) => handleChangePrice(Number(e.target.value), i)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

AddOnTable.propTypes = {
  // addon: PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   price: PropTypes.number,
  //   length: PropTypes.number,
  // }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  addon: PropTypes.array.isRequired,
  index: PropTypes.string.isRequired,
  updateService: PropTypes.func.isRequired,
  updateAddonPrice: PropTypes.func.isRequired,
  updateAddonName: PropTypes.func.isRequired,
};


export default AddOnTable;
