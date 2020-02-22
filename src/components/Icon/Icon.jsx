import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = props => {
  const { className, name, size, svg } = props;
  const baseClass = `ui-icon ui-icon-${name}`;
  const iconClass = `fas fa-${name}`;
  const sizeClass = size ? `fa-${size}` : false;

  if (svg) {
    return (
      <svg
        className={classNames(baseClass, className)}
        role="presentation"
        focusable="false"
      >
        <use xlinkHref={`#${name}`} width="100%" height="100%"></use>
      </svg>
    );
  }

  return (
    <i className={classNames(baseClass, iconClass, sizeClass, className)} />
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  svg: PropTypes.bool
};

export default Icon;
