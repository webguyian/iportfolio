import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text/Text';

import {
  getPercentage,
  getPressure,
  getTime,
  getWindDirection,
  formatTemp
} from 'modules/weather/helpers';

const WeatherSummary = props => {
  const { currentHour, today } = props;
  const baseClass = 'weather-summary';

  return (
    <div className={baseClass}>
      <div className={`${baseClass}-description`}>
        <Text element="p">Today: {today.summary}</Text>
      </div>
      <div className={`${baseClass}-table`}>
        <div className={`${baseClass}-table-row`}>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Sunrise
            </Text>
            <Text>{getTime(today.sunriseTime)}</Text>
          </div>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Sunset
            </Text>
            <Text>{getTime(today.sunsetTime)}</Text>
          </div>
        </div>
        <div className={`${baseClass}-table-row`}>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Chance of rain
            </Text>
            <Text>{getPercentage(today.precipProbability)}</Text>
          </div>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Humidity
            </Text>
            <Text>{getPercentage(today.humidity)}</Text>
          </div>
        </div>
        <div className={`${baseClass}-table-row`}>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Wind
            </Text>
            <Text>
              {getWindDirection(today.windBearing)}{' '}
              {Math.round(today.windSpeed)} mph
            </Text>
          </div>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Feels like
            </Text>
            <Text>{formatTemp(currentHour.apparentTemperature)}</Text>
          </div>
        </div>
        <div className={`${baseClass}-table-row`}>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Precipitation
            </Text>
            <Text>{Math.round(today.precipIntensity)} in</Text>
          </div>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Pressure
            </Text>
            <Text>{getPressure(today.pressure)} inHg</Text>
          </div>
        </div>
        <div className={`${baseClass}-table-row`}>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Visibility
            </Text>
            <Text>{today.visibility} mi</Text>
          </div>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              UX index
            </Text>
            <Text>{today.uvIndex}</Text>
          </div>
        </div>
        <div className={`${baseClass}-table-row`}>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Dew Point
            </Text>
            <Text>{formatTemp(today.dewPoint)}</Text>
          </div>
          <div className={`${baseClass}-table-cell`}>
            <Text className="ui-text--muted" element="h3">
              Ozone
            </Text>
            <Text>{Math.round(today.ozone)} DU</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

WeatherSummary.propTypes = {
  currentHour: PropTypes.object.isRequired,
  today: PropTypes.object.isRequired
};

export default WeatherSummary;
