import React from 'react';
import PropTypes from 'prop-types';

const Hand = props => {
  const { angle, length, width, ...otherProps } = props;

  return (
    <line
      y2={length}
      transform={`rotate(${angle} ${width} ${width})`}
      {...otherProps}
    />
  );
};

Hand.propTypes = {
  angle: PropTypes.number,
  className: PropTypes.string,
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  length: PropTypes.number,
  width: PropTypes.number
};

Hand.defaultProps = {
  x1: 30,
  x2: 30,
  y1: 30,
  length: 60,
  width: 30
};

export default Hand;
