import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Text = props => {
  const { element, modifier, type, ...otherProps } = props;
  const baseClass = `ui-text ui-text--${type}`;
  const modifierClass = modifier && `ui-text--${modifier}`;

  return React.createElement(element, {
    className: classNames(baseClass, modifierClass),
    ...otherProps
  });
};

Text.propTypes = {
  element: PropTypes.string,
  modifier: PropTypes.oneOf(['block', 'bold']),
  type: PropTypes.oneOf(['accessible', 'body', 'display'])
};

Text.defaultProps = {
  element: 'span',
  type: 'body'
};

export default Text;
