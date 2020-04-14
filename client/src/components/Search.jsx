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


const Search = ({
  filterOptions, filters, setFilters, setSearchText,
}) => {
  const classes = useStyles();
  // const [aTimeout, setATimeout] = useState(null);

  // const onChangeSearch = (text) => {
  //   clearTimeout();
  //   setTimeout(setSearchText(text), 1000000);
  // };

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
  // const searchElement = document.getElementById('search');
  // if (searchElement) {
  //   searchElement.addEventListener('keyup', (e) => {
  //     clearTimeout(aTimeout);
  //     const time = setTimeout(() => {
  //       setSearchText(e.target.value);
  //     }, 1000);
  //     setATimeout(time);
  //   });
  // }

  return (
    <div>
      <FormControl style={{ marginBottom: 30 }}>
        <Input
          id="search"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon color="inherit" />
            </InputAdornment>
          )}
        />
      </FormControl>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filterOptions.map((filter) => (
          <Chip
            key={filter}
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
  filterOptions: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.arrayOf(PropTypes.string),
  setFilters: PropTypes.func,
  setSearchText: PropTypes.func.isRequired,
};

Search.defaultProps = {
  filterOptions: [],
  filters: [],
  setFilters: () => null,
};
