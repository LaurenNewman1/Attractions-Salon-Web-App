
import React from 'react';
import {
  ExpansionPanel,
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

const EditService = ({ service }) => {
  const classes = useStyles();
  //   const history = useHistory();
  const [clicked, setClicked] = React.useState(true);

  const handleOpen = () => {
    setClicked(!clicked);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  //   const handleClose = () => {
  //       setClicked(false);
  //   }
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          onClick={handleOpen}
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <TextField
            onClick={(e) => handleClick(e)}
            disabled={clicked}
            defaultValue={service.name}
            className={classes.heading}
            style={{ border: '5px' }}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form className={classes.textfield} autoComplete="off">
            <TextField id="standard-basic" label="Type" defaultValue={service.type} />
            <TextField id="standard-basic" label="SubType" defaultValue={service.subType} />
            <TextField
              id="standard-basic"
              label="Price"
              defaultValue={service.price}
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
            <TextField id="outlined-multiline-static" multiline style={{ width: '88%' }} label="Description" defaultValue={service.description} />
          </form>
          <Button />
        </ExpansionPanelDetails>
        <AddOnTable service={service} />
        <DialogActions>
          <Button color="primary">
            Delete
          </Button>
          <div style={{ flex: '1 0 0' }} />
          <Button color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Save
          </Button>
        </DialogActions>
      </ExpansionPanel>
    </div>
  );
};

EditService.propTypes = {
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


export default EditService;
