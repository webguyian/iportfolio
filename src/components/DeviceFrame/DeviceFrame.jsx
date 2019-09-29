import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import Icon from 'components/Icon/Icon';

class DeviceFrame extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    color: PropTypes.string,
    device: PropTypes.string,
    history: PropTypes.object,
    unlocked: PropTypes.bool
  };

  static defaultProps = {
    color: 'black',
    device: 'iphone-x',
    unlocked: false
  };

  constructor(props) {
    super(props);

    this.handleLock = this.handleLock.bind(this);
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
