import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from 'components/Text/Text';

import { useRadialOffset } from 'modules/clock/hooks';

const Countdown = props => {
  const { hours, minutes, seconds, radius, running } = props;
  const [offset, initialSeconds] = useRadialOffset(props, radius);
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displayHours = hours > 0 ? `${hours}:` : '';
  const animationDuration = `${initialSeconds}s`;
  const animationPlayState = running ? 'running' : 'paused';
  const baseClass = 'countdown';
  const textClass = `${baseClass}-text`;
  const textWithHours = displayHours && `${textClass}--with-hours`;
  const style = {
    animationDuration,
    animationPlayState,
    strokeDashoffset: offset
  };

  return (
    <div className={baseClass}>
      <svg className={`${baseClass}-svg`}>
        <circle style={style} r={radius} cx={radius} cy={radius}></circle>
      </svg>
      <Text element="h2" className={cx(textClass, textWithHours)}>
        {`${displayHours}${displayMinutes}:${displaySeconds}`}
      </Text>
    </div>
  );
};

Countdown.propTypes = {
  allSeconds: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  radius: PropTypes.number,
  running: PropTypes.bool,
  seconds: PropTypes.number.isRequired
};

Countdown.defaultProps = {
  radius: 175,
  running: false
};

export default Countdown;
