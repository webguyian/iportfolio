import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';

import { getHour, formatTemp } from 'modules/weather/helpers';

const WeatherHour = props => {
  const { icon, temperature, time } = props;
  const baseClass = 'weather-hour';

  return (
    <li className={baseClass}>
      <Text className={`${baseClass}-time`}>{getHour(time)}</Text>
      <Icon svg className={`${baseClass}-icon`} name={icon} />
      <Text className={`${baseClass}-temperature`}>
        {formatTemp(temperature)}
      </Text>
    </li>
  );
};

WeatherHour.propTypes = {
  icon: PropTypes.string,
  temperature: PropTypes.number,
  time: PropTypes.number
};

export default WeatherHour;
