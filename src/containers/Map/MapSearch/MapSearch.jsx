import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';

const MapSearch = props => {
  const { inputRef } = props;
  const baseClass = 'map-search';
  const handleSubmit = event => event.preventDefault();

  return (
    <form className={baseClass} onSubmit={handleSubmit}>
      <input
        className={`${baseClass}-input`}
        placeholder="Search here"
        ref={inputRef}
      />
      <Button className={`${baseClass}-btn`} icon="search" type="submit">
        Search
      </Button>
    </form>
  );
};

MapSearch.propTypes = {
  inputRef: PropTypes.object
};

export default MapSearch;
