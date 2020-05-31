import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';

const Link = forwardRef((props, ref) => {
  const {
    back,
    backLabel,
    children,
    className,
    external,
    icon,
    iconSize,
    state,
    to,
    withLabel,
    ...otherProps
  } = props;
  const baseClass = 'ui-link';
  const backLinkClass = `${baseClass}--back`;
  const iconClass = icon && `${baseClass}--with-icon`;

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
        className={classNames(baseClass, className)}
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
      className={classNames(baseClass, iconClass, className)}
      to={state ? { pathname: to, state } : to}
      ref={ref}
      {...otherProps}
    >
      {icon ? <Icon name={icon} size={iconSize} /> : children}
      {withLabel && <Text className={`${baseClass}-label`}>{children}</Text>}
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
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  state: PropTypes.object,
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  withLabel: PropTypes.bool
};

Link.defaultProps = {
  back: false,
  external: false,
  backLabel: 'Back',
  withLabel: false
};

export default Link;
