import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon/Icon';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

import { DEFAULT_LOCATIONS } from 'modules/weather/constants';
import { getTemp } from 'modules/weather/helpers';
import { useWeatherLocations } from 'modules/weather/hooks';

const WeatherList = props => {
  const { current } = props;
  const locations = useWeatherLocations(DEFAULT_LOCATIONS);
  const baseClass = 'weather-list';

  return (
    <ul className={baseClass}>
      {current && (
        <li className={`${baseClass}-item`}>
          <Link to="/weather">
            <Text>
              {current.city} <Icon name="location-arrow" />
            </Text>
            <Text>{getTemp(current)}</Text>
          </Link>
        </li>
      )}
      {locations.map(location => (
        <li key={location.city} className={`${baseClass}-item`}>
          <Link
            to={{
              pathname: '/weather',
              state: {
                data: location
              }
            }}
          >
            <Text>{location.city}</Text>
            <Text>{getTemp(location)}</Text>
          </Link>
        </li>
      ))}
    </ul>
  );
};

WeatherList.propTypes = {
  current: PropTypes.object
};

export default WeatherList;
