
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
  addon, updateAddonName, updateAddonPrice,
}) => {
  const classes = useStyles();

  const handleChangeName = (e, i) => {
    updateAddonName(e, i);
  };

  const handleChangePrice = (e, i) => {
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
            {!addon.length ? null
              : addon.map((addons, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <TextField
                      value={addons.name}
                      onChange={(e) => handleChangeName(e.target.value, i)}
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
                      value={addons.price}
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
  // eslint-disable-next-line react/forbid-prop-types
  addon: PropTypes.array.isRequired,
  updateAddonPrice: PropTypes.func.isRequired,
  updateAddonName: PropTypes.func.isRequired,
};


export default AddOnTable;
