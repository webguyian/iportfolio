import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidMount() {
    window.addEventListener('devicemotion', this.detectMotion, false);
  }

  detectMotion(e) {
    let acc = e.acceleration;
    let lastX, lastY, lastZ;
    let moveCounter = 0;

    if (!acc.hasOwnProperty('x')) {
      acc = e.accelerationIncludingGravity;
    }

    if (!acc.x) {
      return;
    }

    if (Math.abs(acc.x) >= 1 && Math.abs(acc.y) >= 1 && Math.abs(acc.z) >= 1) {
      if (!lastX) {
        lastX = acc.x;
        lastY = acc.y;
        lastZ = acc.z;
        return;
      }

      const deltaX = Math.abs(acc.x - lastX);
      const deltaY = Math.abs(acc.y - lastY);
      const deltaZ = Math.abs(acc.z - lastZ);

      if (deltaX + deltaY + deltaZ > 3) {
        moveCounter++;
      } else {
        moveCounter = Math.max(0, --moveCounter);
      }

      if (moveCounter > 2) {
        window.location.reload();
        return;
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    }
  }

  refresh() {
    window.location.reload();
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    const baseClass = 'ui-error';

    if (hasError) {
      return (
        <div className={baseClass}>
          <Button
            className={`${baseClass}-btn`}
            icon="skull-crossbones"
            size="3x"
            onClick={this.refresh}
          >
            Click to refresh
          </Button>
          <Text className={`${baseClass}-heading`} element="h1" type="display">
            Something went terribly wrong.
          </Text>
          <Text className={`${baseClass}-message`} element="p">
            Shake vigorously to refresh.
          </Text>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
