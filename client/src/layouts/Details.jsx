import {
  TextField, Card, CardMedia, Grid, CardActionArea, useTheme, FormControl,
  InputLabel, Select, MenuItem, Input, Chip,
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../css/DetailsStyles';
import hairIllustration from '../images/hairIllustration.png';
import eye from '../images/eye.png';
import hand from '../images/hand.png';
import loadServiceOptions from '../stores/DetailsStore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Details = ({ userData }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [name, setName] = useState(userData ? userData.name : '');
  const [email, setEmail] = useState(userData ? userData.email : null);
  const [type, setType] = useState('');
  const [service, setService] = useState({});
  const [addons, setAddons] = useState([]);
  const [specialist, setSpecialist] = useState('');
  const [notes, setNotes] = useState('');

  const [serviceOptions, setServiceOptions] = useState([]);

  const addOn = (value) => {
    setAddons(value);
  };

  const changeType = async (newType) => {
    setType(newType);
    setServiceOptions(await loadServiceOptions(newType));
    setService({});
    setAddons([]);
    setSpecialist('');
  };

  const changeService = (newService) => {
    setService(newService);
    setAddons([]);
    setSpecialist('');
  };

  return (
    <>
      <h2 className={classes.header}>How can we help you today?</h2>
      <form>
        <TextField
          required
          label="Name"
          className={classes.textfield}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          required
          label="Email"
          className={classes.textfield}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={4}>
            <Card
              className={classes.card}
              style={{ borderColor: type === 'hair' ? theme.palette.primary.main : 'transparent' }}
            >
              <CardActionArea onClick={() => changeType('hair')}>
                <CardMedia component="image" image={hairIllustration} className={classes.media} />
                <h5 className={classes.cardContent}>Hair</h5>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              className={classes.card}
              style={{ borderColor: type === 'wax' ? theme.palette.primary.main : 'transparent' }}
            >
              <CardActionArea onClick={() => changeType('wax')}>
                <CardMedia component="image" image={eye} className={classes.media} />
                <h5 className={classes.cardContent}>Wax</h5>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              className={classes.card}
              style={{ borderColor: type === 'nails' ? theme.palette.primary.main : 'transparent' }}
            >
              <CardActionArea onClick={() => changeType('nails')}>
                <CardMedia component="image" image={hand} className={classes.media} />
                <h5 className={classes.cardContent}>Nails</h5>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <FormControl required className={classes.textfield}>
          <InputLabel>Service</InputLabel>
          <Select
            // I think Select doesn't accept objects... this works except causes ui bug
            value={service}
            onChange={(event) => changeService(event.target.value)}
            MenuProps={MenuProps}
          >
            {serviceOptions.map((serv) => (
              <MenuItem key={serv.id} value={serv}>
                {serv.name}
                {' '}
                ($
                {serv.price}
                )
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.textfield}>
          <InputLabel>Add-ons</InputLabel>
          <Select
            multiple
            value={addons}
            onChange={(event) => addOn(event.target.value)}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value.name} label={value.name} className={classes.chip} color="secondary" />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {service && service.addons
              ? service.addons.map((add) => (
                <MenuItem key={add.name} value={add}>
                  {add.name}
                  {' '}
                  ($
                  {add.price}
                  )
                </MenuItem>
              ))
              : null}
          </Select>
        </FormControl>
        <FormControl className={classes.textfield}>
          <InputLabel>Preferred Specialist</InputLabel>
          <Select
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
            MenuProps={MenuProps}
          >
            <MenuItem value="Test1">Test1</MenuItem>
            <MenuItem value="Test2">Test2</MenuItem>
            <MenuItem value="Test3">Test3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.textfield}
          label="Notes"
          multiline
          rowsMax="4"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </form>
    </>
  );
};

Details.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.number.isRequired,
  }).isRequired,
};

export default Details;
