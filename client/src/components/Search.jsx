import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, InputAdornment, FormControl, Chip, Typography, makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
  chip: {
    marginRight: 5,
    marginBottom: 8,
  },
}));


const Search = ({ filterOptions, filters, setFilters }) => {
  const classes = useStyles();

  const changeFilters = (filter) => {
    const allFilters = [...filters];
    const index = allFilters.findIndex((f) => f === filter);
    if (index === -1) {
      allFilters.push(filter);
    } else {
      allFilters.splice(index, 1);
    }
    setFilters(allFilters);
  };

  return (
    <div>
      <FormControl style={{ marginBottom: 30 }}>
        <Input
          placeholder="Search"
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )}
        />
      </FormControl>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filterOptions.map((filter) => (
          <Chip
            color={filters.find((f) => f === filter) ? 'secondary' : 'default'}
            label={filter}
            className={classes.chip}
            onClick={() => changeFilters(filter)}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  filterOptions: PropTypes.shape([]),
  filters: PropTypes.shape([]),
  setFilters: PropTypes.func,
};

Search.defaultProps = {
  filterOptions: [],
  filters: [],
  setFilters: () => null,
};
