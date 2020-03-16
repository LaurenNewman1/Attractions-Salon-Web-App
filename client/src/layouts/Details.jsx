import {
  TextField, Card, CardMedia, Grid, CardActionArea, useTheme, FormControl,
  InputLabel, Select, MenuItem, Input, Chip,
} from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from '../css/DetailsStyles';
import hairIllustration from '../images/hairIllustration.png';
import eye from '../images/eye.png';
import hand from '../images/hand.png';

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

const temps = [
  'test1', 'test2', 'test3',
];

const Details = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [type, setType] = useState('');
  const [service, setService] = useState('');
  const [addons, setAddons] = useState([]);
  const [specialist, setSpecialist] = useState('');
  const [notes, setNotes] = useState('');

  const addOn = (value) => {
    setAddons(value);
  };

  return (
    <>
      <h2 className={classes.header}>How can we help you today?</h2>
      <form>
        <TextField required label="Name" className={classes.textfield} />
        <TextField required label="Email" className={classes.textfield} />
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={4}>
            <Card
              className={classes.card}
              style={{ borderColor: type === 'hair' ? theme.palette.primary.main : 'transparent' }}
            >
              <CardActionArea onClick={() => setType('hair')}>
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
              <CardActionArea onClick={() => setType('wax')}>
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
              <CardActionArea onClick={() => setType('nails')}>
                <CardMedia component="image" image={hand} className={classes.media} />
                <h5 className={classes.cardContent}>Nails</h5>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <FormControl required className={classes.textfield}>
          <InputLabel>Service</InputLabel>
          <Select
            value={service}
            onChange={(event) => setService(event.target.value)}
          >
            <MenuItem value="Test1">Test1</MenuItem>
            <MenuItem value="Test2">Test2</MenuItem>
            <MenuItem value="Test3">Test3</MenuItem>
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
                  <Chip key={value} label={value} className={classes.chip} color="secondary" />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {temps.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.textfield}>
          <InputLabel>Preferred Specialist</InputLabel>
          <Select
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
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

export default Details;
