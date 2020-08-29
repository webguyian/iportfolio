import React from 'react';
import { func, string } from 'prop-types';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

const SearchInput = props => {
  const { onCancel, onSubmit, placeholder, ...inputHandlers } = props;
  const baseClass = 'ui-search-field';

  return (
    <form className={baseClass} onSubmit={onSubmit}>
      <Icon name="search" />
      <input
        className={`${baseClass}-input`}
        aria-label={placeholder}
        placeholder={placeholder}
        {...inputHandlers}
      />
      <Button modifier="anchor" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
};

SearchInput.propTypes = {
  onBlur: func.isRequired,
  onCancel: func.isRequired,
  onChange: func.isRequired,
  onFocus: func.isRequired,
  onSubmit: func,
  placeholder: string
};

SearchInput.defaultProps = {
  placeholder: 'Search'
};

export default SearchInput;
