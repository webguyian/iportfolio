import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string
  };

  render() {
    const { name, size } = this.props;
    const baseClass = `fas icon icon-${name}`;
    const iconClass = `fa-${name}`;
    const sizeClass = size ? `fa-${size}` : false;

    return <i className={classNames(baseClass, iconClass, sizeClass)} />;
  }
}

export default Icon;
