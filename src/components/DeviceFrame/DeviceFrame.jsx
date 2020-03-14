import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useBreakpoint } from 'hooks';

import Icon from 'components/Icon/Icon';

const DeviceFrame = props => {
  const {
    breakpoint,
    className,
    children,
    color,
    device,
    invertIconColor,
    leftIndicator
  } = props;
  const isMobile = useBreakpoint(breakpoint);
  const baseClass = 'device';
  const deviceClass = `${baseClass}-${device}`;
  const colorClass = `${baseClass}-${color}`;

  const header = () => {
    const headerBarsClass = 'device-header-bars';
    const invertedClass = invertIconColor && `${headerBarsClass}--inverted`;
    const blockClass = `${headerBarsClass}-block`;

    return (
      <div className="device-header-container">
        <div className={classNames(headerBarsClass, invertedClass)}>
          <div className={`${blockClass} ${blockClass}--time`}>
            {leftIndicator}
          </div>
          <div className={`${blockClass} ${blockClass}--icons`}>
            <Icon name="signal" />
            <Icon name="wifi" />
            <Icon name="battery-full" />
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className={className}>
        <div className="device-content">
          {header()}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(className, baseClass, deviceClass, colorClass)}>
      <div className="device-frame">
        <div className="device-content">
          {header()}
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
};

DeviceFrame.propTypes = {
  breakpoint: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  device: PropTypes.string,
  invertIconColor: PropTypes.bool,
  leftIndicator: PropTypes.element
};

DeviceFrame.defaultProps = {
  breakpoint: 480,
  color: 'black',
  device: 'iphone-x',
  invertIconColor: false
};

export default DeviceFrame;
