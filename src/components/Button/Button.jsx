import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';

class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.string,
    modifier: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'button'
  };

  render() {
    const { children, className, icon, modifier, size, ...props } = this.props;
    const baseClass = 'ui-btn';
    const modifierClass = modifier ? `${baseClass}--${modifier}` : false;

    return (
      <button
        className={classNames(baseClass, modifierClass, className)}
        {...props}
      >
        {icon ? <Icon name={icon} size={size} /> : children}
        {icon ? <Text type="accessible">{children}</Text> : null}
      </button>
    );
  }
}

export default Button;
