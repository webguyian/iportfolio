import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = props => {
  const { name, size } = props;
  const baseClass = `ui-icon ui-icon-${name}`;
  const iconClass = `fas fa-${name}`;
  const sizeClass = size ? `fa-${size}` : false;

  return <i className={classNames(baseClass, iconClass, sizeClass)} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default Icon;
