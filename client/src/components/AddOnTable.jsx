
import React, { useState } from 'react';
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
  addon, index, updateAddonName, updateAddonPrice,
}) => {
  const classes = useStyles();
  const [addonName, setAddonName] = useState(addon.name);
  const [addonPrice, setAddonPrice] = useState(addon.price);

  const handleChangeName = async (e, i) => {
    console.log(e);
    await setAddonName(e);
    updateAddonName(addonName, 0);
  };

  const handleChangePrice = (e, i) => {
    console.log(e);
    updateAddonPrice(e, i);
  };

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
            {/* {!addon.length ? null
              : addon.map((add, i) => ( */}
            <TableRow key={addon.name}>
              <TableCell component="th" scope="row">
                <TextField
                  value={addonName}
                  onChange={(e) => handleChangeName(e.target.value)}
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
                  value={addon.price}
                  onChange={(e) => setAddonPrice(Number(e.target.value))}
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
  // eslint-disable-next-line react/forbid-prop-types
  addon: PropTypes.array.isRequired,
  updateAddonPrice: PropTypes.func.isRequired,
  updateAddonName: PropTypes.func.isRequired,
};


export default AddOnTable;
