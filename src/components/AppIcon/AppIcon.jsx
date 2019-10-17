import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import kebabCase from 'lodash/kebabCase';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

class AppIcon extends Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    noLabel: PropTypes.bool
  };

  static defaultProps = {
    noLabel: false
  };

  constructor(props) {
    super(props);

    this.baseClass = 'ui-app-icon';
  }

  render() {
    const { children, name, noLabel } = this.props;
    const nameClass = name && `${this.baseClass}--${kebabCase(name)}`;

    return (
      <div className={classNames(this.baseClass, nameClass)}>
        <Button className={`${this.baseClass}-button`}>{children}</Button>
        {!noLabel && <Text className={`${this.baseClass}-label`}>{name}</Text>}
      </div>
    );
  }
}

export default AppIcon;
