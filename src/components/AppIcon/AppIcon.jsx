import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

class AppIcon extends Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.baseClass = 'ui-app-icon';
  }

  render() {
    const { children, name } = this.props;
    const nameClass = name && `${this.baseClass}--${name.toLowerCase()}`;

    return (
      <Button className={classNames(this.baseClass, nameClass)}>
        {children}
        <Text className={`${this.baseClass}-label`}>{name}</Text>
      </Button>
    );
  }
}

export default AppIcon;
