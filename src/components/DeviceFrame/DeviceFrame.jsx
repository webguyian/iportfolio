import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class DeviceFrame extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    color: PropTypes.string,
    device: PropTypes.string
  };

  static defaultProps = {
    color: 'black',
    device: 'iphone-x'
  };

  get header() {
    const blockClass = 'device-header-bars-block';

    return (
      <div className="device-header-container">
        <div className="device-header-bars">
          <div className={`${blockClass} ${blockClass}--time`}>
            <span className="device-time-label">IMAC</span>
          </div>
          <div className={`${blockClass} ${blockClass}--icons`}>
            <i className="fas fa-signal" />
            <i className="fas fa-wifi" />
            <i className="fas fa-battery-full" />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { className, children, color, device } = this.props;
    const baseClass = 'device';
    const deviceClass = `${baseClass}-${device}`;
    const colorClass = `${baseClass}-${color}`;

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
