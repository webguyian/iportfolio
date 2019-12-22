import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import RoundedButton from 'components/Button/RoundedButton';

const TimerControls = props => {
  const {
    disabled,
    hasLaps,
    primaryAction,
    resetLabel,
    secondaryAction,
    secondaryLabel,
    startLabel,
    stopLabel,
    timerRunning
  } = props;
  const baseClass = 'timer-controls';
  const controlClass = 'timer-control';
  const controlDisabledClass = disabled && `${controlClass}--disabled`;
  const controlStateClass = timerRunning
    ? `${controlClass}--${stopLabel.toLowerCase()}`
    : `${controlClass}--start`;

  return (
    <div className={baseClass}>
      <div className={classNames(controlClass, controlDisabledClass)}>
        <RoundedButton disabled={disabled} onClick={secondaryAction}>
          {!timerRunning && hasLaps ? resetLabel : secondaryLabel}
        </RoundedButton>
      </div>
      <div className={classNames(controlClass, controlStateClass)}>
        <RoundedButton onClick={primaryAction}>
          {timerRunning ? stopLabel : startLabel}
        </RoundedButton>
      </div>
    </div>
  );
};

TimerControls.propTypes = {
  disabled: PropTypes.bool,
  hasLaps: PropTypes.bool,
  primaryAction: PropTypes.func.isRequired,
  resetLabel: PropTypes.string,
  secondaryAction: PropTypes.func.isRequired,
  secondaryLabel: PropTypes.string,
  startLabel: PropTypes.string,
  stopLabel: PropTypes.string,
  timerRunning: PropTypes.bool
};

TimerControls.defaultProps = {
  disabled: false,
  hasLaps: false,
  resetLabel: 'Reset',
  secondaryLabel: 'Lap',
  startLabel: 'Start',
  stopLabel: 'Stop',
  timerRunning: false
};

export default TimerControls;
