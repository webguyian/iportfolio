import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';

const Button = forwardRef((props, ref) => {
  const { children, className, icon, size, withLabel, ...otherProps } = props;
  const baseClass = 'ui-btn';
  const iconClass = icon ? `${baseClass}--with-icon` : false;

  return (
    <button
      className={classNames(baseClass, iconClass, className)}
      ref={ref}
      {...otherProps}
    >
      {icon ? <Icon name={icon} size={size} /> : children}
      {withLabel && <Text className={`${baseClass}-label`}>{children}</Text>}
      {icon && !withLabel ? <Text type="accessible">{children}</Text> : null}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  withLabel: PropTypes.bool
};

Button.defaultProps = {
  type: 'button',
  withLabel: false
};

export default Button;
