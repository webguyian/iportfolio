import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import Icon from 'components/Icon/Icon';

class DeviceFrame extends Component {
  static propTypes = {
    breakpoint: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
    color: PropTypes.string,
    device: PropTypes.string,
    history: PropTypes.object,
    unlocked: PropTypes.bool
  };

  static defaultProps = {
    breakpoint: 480,
    color: 'black',
    device: 'iphone-x',
    unlocked: false
  };

  constructor(props) {
    super(props);

    this.handleLock = this.handleLock.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.state = {
      isMobile: this.isMobile
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  get header() {
    const { unlocked } = this.props;
    const blockClass = 'device-header-bars-block';

    return (
      <div className="device-header-container">
        <div className="device-header-bars">
          <div className={`${blockClass} ${blockClass}--time`}>
            <span className="device-time-label">
              {unlocked ? this.time : 'IMAC'}
            </span>
          </div>
          <div className={`${blockClass} ${blockClass}--icons`}>
            <Icon name="signal" />
            <Icon name="wifi" />
            <Icon name="battery-full" />
          </div>
        </div>
      </div>
    );
  }

  get isMobile() {
    const { breakpoint } = this.props;

    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  }

  get time() {
    return (
      <Fragment>
        <DateTime format="H:mm" />
        <Button icon="lock-open" onClick={this.handleLock} />
      </Fragment>
    );
  }

  handleLock() {
    const { history } = this.props;

    history.goBack();
  }

  handleResize() {
    this.setState(() => ({
      isMobile: this.isMobile
    }));
  }

  render() {
    const { className, children, color, device } = this.props;
    const { isMobile } = this.state;
    const baseClass = 'device';
    const deviceClass = `${baseClass}-${device}`;
    const colorClass = `${baseClass}-${color}`;

    if (isMobile) {
      return (
        <div className={className}>
          <div className="device-content">
            {this.header}
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        className={classNames(className, baseClass, deviceClass, colorClass)}
      >
        <div className="device-frame">
          <div className="device-content">
            {this.header}
            {children}
          </div>
        </div>
        <div className="device-stripe" />
        <div className="device-header" />
        <div className="device-sensors" />
        <div className="device-btns" />
        <div className="device-power" />
      </div>
    );
  }
}

export default DeviceFrame;
