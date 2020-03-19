
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

const AddOnTable = ({ service }) => {
  const classes = useStyles();

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
            <TableRow key={service.name}>
              <TableCell component="th" scope="row">
                <TextField defaultValue={service.name} />
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
                  defaultValue={service.price}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

AddOnTable.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    time: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    subType: PropTypes.string,
    addons: PropTypes.array,
  }).isRequired,
};


export default AddOnTable;
