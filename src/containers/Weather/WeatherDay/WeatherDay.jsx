import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';

import { getWeekday, formatTemp } from 'modules/weather/helpers';

const WeatherDay = props => {
  const { icon, time, temperatureHigh, temperatureLow } = props;
  const baseClass = 'weather-day';
  const weekday = getWeekday(time);

  return (
    <li className={baseClass}>
      <Text className={`${baseClass}-name`}>{weekday}</Text>
      <Icon svg className={`${baseClass}-icon`} name={icon} />
      <div className={`${baseClass}-temperature`}>
        <Text>{formatTemp(temperatureHigh, false)}</Text>
        <Text>{formatTemp(temperatureLow, false)}</Text>
      </div>
    </li>
  );
};

WeatherDay.propTypes = {
  icon: PropTypes.string.isRequired,
  temperatureHigh: PropTypes.number,
  temperatureLow: PropTypes.number,
  time: PropTypes.number.isRequired
};

export default WeatherDay;
