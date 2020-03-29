
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
  addon, updateAddonName, updateAddonPrice, index,
}) => {
  const classes = useStyles();
  const [price, setPrice] = React.useState(addon.price);
  const [name, setName] = React.useState(addon.name);
  // const handleClick = (addons, index) => {

  //   console.log(addons.name);
  //   console.log(index);
  // };

  const handleClick = () => {
    console.log(addon.name);
    console.log(index);
  };
  const handleChangeName = (e) => {
    console.log(e);
    updateAddonName(e, index);
  };
  const handleChangePrice = (e) => {
    console.log(e);
    updateAddonPrice(e, index);
  };
  return (
    <div className={classes.table}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          {/* <TableHead>
            <TableRow><h3 style={{ paddingLeft: '10px' }}>Addons</h3></TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {/* {!service.addons.length ? null */}
            {/* : service.addons.map((addons, index) => ( */}
            <TableRow key={addon.name}>
              <TableCell component="th" scope="row">
                <TextField defaultValue={addon.name} onClick={() => handleClick()} onChange={(e) => handleChangeName(e.target.value)} />
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
                  defaultValue={addon.price}
                  onClick={() => handleClick()}
                  onChange={(e) => handleChangePrice(e.target.value)}
                />
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

AddOnTable.propTypes = {
  addon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
};


export default AddOnTable;
