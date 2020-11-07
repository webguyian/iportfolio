import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

import { isIE } from 'modules/browser/helpers';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      message: 'Shake vigorously to refresh.'
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidMount() {
    window.addEventListener('devicemotion', this.detectMotion, false);

    if (isIE()) {
      this.setState({
        hasError: true,
        message: "You're using an outdated and unsupported browser."
      });
    }
  }

  refresh() {
    window.location.reload();
  }

  render() {
    const { children } = this.props;
    const { hasError, message } = this.state;
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
            {message}
          </Text>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
