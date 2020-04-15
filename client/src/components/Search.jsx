import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, InputAdornment, FormControl, Chip, Typography, makeStyles, IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
// import Loading from './Loading';

const useStyles = makeStyles(() => ({
  chip: {
    marginRight: 5,
    marginBottom: 8,
  },
}));

const Search = ({
  filterOptions, filters, setFilters, searchText, setSearchText,
}) => {
  const classes = useStyles();
  // const [aTimeout, setATimeout] = useState(null);
  // const [loading, setLoading] = useState(false);

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
  //     setLoading(true);
  //     const time = setTimeout(() => {
  //       setSearchText(e.target.value);
  //       setLoading(false);
  //     }, 1000);
  //     setATimeout(time);
  //   });
  // }

  return (
    <>
      {/* {loading ? <Loading disableShrink /> : null} */}
      <FormControl style={{ marginBottom: 30, width: '100%' }}>
        <Input
          id="search"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setSearchText('')}><ClearIcon /></IconButton>
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
    </>
  );
};

export default Search;

Search.propTypes = {
  filterOptions: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.arrayOf(PropTypes.string),
  setFilters: PropTypes.func,
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
};

Search.defaultProps = {
  filterOptions: [],
  filters: [],
  setFilters: () => null,
};
