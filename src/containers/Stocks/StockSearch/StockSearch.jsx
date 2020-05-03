import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

const StockSearch = props => {
  const { onCancel, ...inputHandlers } = props;
  const baseClass = 'stock-search';

  return (
    <form className={baseClass}>
      <Icon name="search" />
      <input
        className={`${baseClass}-input`}
        aria-label="Search"
        placeholder="Search"
        {...inputHandlers}
      />
      <Button className="anchor" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
};

StockSearch.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
};

export default StockSearch;
