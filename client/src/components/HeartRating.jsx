import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Favorite } from '@material-ui/icons';

const styles = createStyles((theme) => ({
  iconFilled: {
    color: theme.palette.primary.main,
  },
  iconHover: {
    color: theme.palette.primary.dark,
  },
}));

const StyledRating = withStyles(styles)(Rating);

const HeartRating = ({ defaultValue, edit, onChange }) => (
  <StyledRating
    icon={<Favorite />}
    precision={0.5}
    readOnly={!edit}
    value={defaultValue}
    onChange={(event, newValue) => onChange(newValue)}
  />
);

HeartRating.propTypes = {
  defaultValue: PropTypes.number,
  edit: PropTypes.bool,
  onChange: PropTypes.func,
};

HeartRating.defaultProps = {
  defaultValue: 5,
  edit: false,
  onChange: null,
};

export default HeartRating;
