import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

import Icon from 'components/Icon/Icon';

const Link = forwardRef((props, ref) => {
  const {
    back,
    backLabel,
    children,
    className,
    external,
    to,
    ...otherProps
  } = props;
  const baseClass = 'ui-link';
  const backLinkClass = `${baseClass}--back`;

  if (back) {
    return (
      <RouterLink
        className={classNames(baseClass, backLinkClass, className)}
        to={to}
        ref={ref}
        {...otherProps}
      >
        <Icon name="chevron-left" /> {backLabel}
      </RouterLink>
    );
  }

  if (external) {
    return (
      <a
        href={to}
        className={baseClass}
        target="_blank"
        rel="noopener noreferrer"
        {...otherProps}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      className={classNames(baseClass, className)}
      to={to}
      ref={ref}
      {...otherProps}
    >
      {children}
    </RouterLink>
  );
});

Link.displayName = 'Link';

Link.propTypes = {
  back: PropTypes.bool,
  backLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  external: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

Link.defaultProps = {
  back: false,
  external: false,
  backLabel: 'Back'
};

export default Link;
