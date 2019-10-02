import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Hand extends Component {
  static propTypes = {
    angle: PropTypes.number,
    className: PropTypes.string,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    length: PropTypes.number,
    width: PropTypes.number
  };

  static defaultProps = {
    x1: 30,
    x2: 30,
    y1: 30,
    length: 60,
    width: 30
  };

  render() {
    const { angle, length, width, ...props } = this.props;

    return (
      <line
        y2={length}
        transform={`rotate(${angle} ${width} ${width})`}
        {...props}
      />
    );
  }
}

export default Hand;
