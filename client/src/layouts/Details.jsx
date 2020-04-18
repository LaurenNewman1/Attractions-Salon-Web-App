import {
  TextField, Card, CardMedia, Grid, CardActionArea, useTheme, FormControl,
  InputLabel, Select, MenuItem, Input, Chip,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../css/DetailsStyles';
import hairIllustration from '../images/hairIllustration.png';
import eye from '../images/eye.png';
import hand from '../images/hand.png';
import Loading from '../components/Loading';

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

const Details = ({
  booking, updateBooking, loading, specialists, services, compact, setNoPrice,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [serviceOptions, setServiceOptions] = useState([]);
  const [addOnOptions, setAddOnOptions] = useState([]);
  const [type, setType] = useState(services.find((s) => s._id === booking.service)
    ? services.find((s) => s._id === booking.service).type : '');

  const getServiceDetails = () => serviceOptions.find((s) => s._id === booking.service) || '';

  useEffect(() => {
    // If user is going back
    if (type.length) {
      const serviceOpts = services.filter((s) => s.type === type);
      setServiceOptions(serviceOpts);
      setAddOnOptions(serviceOpts.find((s) => s._id === booking.service).addons);
    }
  }, []);

  useEffect(() => {
    const serviceDetails = services.find((s) => s._id === booking.service);
    async function fetchData(typ) {
      setType(typ);
      setServiceOptions(services.filter((s) => s.type === typ));
      setAddOnOptions(serviceDetails.addons);
    }
    if (serviceDetails) {
      fetchData(serviceDetails.type);
    }
  }, [services]);

  const changeType = async (newType) => {
    setType(newType);
    updateBooking(['service', ''], ['addons', []], ['specialist', '']);
    await setServiceOptions(services.filter((s) => s.type === newType));
    setAddOnOptions([]);
  };

  const changeService = async (newService) => {
    await updateBooking(['service', newService], ['addons', []], ['specialist', '']);
    setAddOnOptions(serviceOptions.find((s) => s._id === newService).addons);
    if (!(serviceOptions.find((s) => s._id === newService).price)) {
      setNoPrice(true);
    } else {
      setNoPrice(false);
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      {!compact ? <h2 className={classes.header}>How can we help you today?</h2> : null}
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormControl required className={classes.formControl}>
            <InputLabel>Service</InputLabel>
            <Select
              value={booking.service}
              onChange={(event) => changeService(event.target.value)}
              MenuProps={MenuProps}
            >
              {serviceOptions.map((serv) => (
                <MenuItem key={serv._id} value={serv._id}>
                  {serv.name}
                  {' '}
                  ($
                  {serv.price === 0 ? '' : serv.price}
                  )
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.textfield}>
            <InputLabel>Add-ons</InputLabel>
            <Select
              multiple
              value={booking.addons}
              onChange={(event) => updateBooking(['addons', event.target.value])}
              input={<Input />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value.name}
                      label={value.name}
                      className={classes.chip}
                      size="small"
                      color="secondary"
                    />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {addOnOptions ? addOnOptions.map((add) => (
                <MenuItem key={add.name} value={add}>
                  {add.name}
                  {' '}
                  ($
                  {add.price}
                  )
                </MenuItem>
              )) : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.textfield}>
            <InputLabel>Preferred Specialist</InputLabel>
            <Select
              value={booking.specialist}
              onChange={(e) => updateBooking(['specialist', e.target.value])}
            >
              {booking.service ? specialists.map((specialist) => {
                if (specialist.specialties.find((s) => s === getServiceDetails().type
                      || s === getServiceDetails().subtype)) {
                  return (
                    <MenuItem key={specialist._id} value={specialist._id}>
                      {specialist.name}
                    </MenuItem>
                  );
                }
                return null;
              }) : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            label="Notes"
            multiline
            rowsMax="4"
            value={booking.notes}
            onChange={(event) => updateBooking(['notes', event.target.value])}
          />
        </Grid>
      </Grid>
    </>
  );
};

Details.propTypes = {
  booking: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    confirmed: PropTypes.bool,
    time: PropTypes.string,
    service: PropTypes.string,
    addons: PropTypes.array,
    specialist: PropTypes.string,
    notes: PropTypes.string,
    payInStore: PropTypes.bool,
  }).isRequired,
  updateBooking: PropTypes.func.isRequired,
  setNoPrice: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  specialists: PropTypes.shape([{
    name: PropTypes.string,
    specialties: PropTypes.array,
  }]).isRequired,
  services: PropTypes.shape([{
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    time: PropTypes.number,
    banner: PropTypes.string,
    type: PropTypes.string,
    subtype: PropTypes.string,
    addons: PropTypes.array,
  }]).isRequired,
  compact: PropTypes.bool,
};

Details.defaultProps = {
  compact: false,
};

export default Details;
