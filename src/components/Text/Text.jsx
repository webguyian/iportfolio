import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Text extends Component {
  static propTypes = {
    element: PropTypes.string,
    modifier: PropTypes.oneOf(['block', 'bold']),
    type: PropTypes.oneOf(['body', 'display'])
  };

  static defaultProps = {
    element: 'span',
    type: 'body'
  };

  get element() {
    const { element, modifier, type, ...props } = this.props;
    const baseClass = `ui-text ui-text--${type}`;
    const modifierClass = modifier && `ui-text--${modifier};`;

    return React.createElement(element, {
      className: classNames(baseClass, modifierClass),
      ...props
    });
  }

  render() {
    return this.element;
  }
}

export default Text;
