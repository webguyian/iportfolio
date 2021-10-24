import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Text = props => {
  const { className, element, modifier, type, ...otherProps } = props;
  const baseClass = `ui-text ui-text--${type}`;
  const modifierClass = modifier && `ui-text--${modifier}`;

  return React.createElement(element, {
    className: cx(baseClass, modifierClass, className),
    ...otherProps
  });
};

Text.propTypes = {
  className: PropTypes.string,
  element: PropTypes.string,
  modifier: PropTypes.oneOf([
    'anchor',
    'anchor-block',
    'block',
    'bold',
    'light'
  ]),
  type: PropTypes.oneOf(['accessible', 'body', 'display'])
};

Text.defaultProps = {
  element: 'span',
  type: 'body'
};

export default Text;
