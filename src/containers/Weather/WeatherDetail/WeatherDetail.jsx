import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text/Text';
import WeatherBackground from 'containers/Weather/WeatherBackground/WeatherBackground';
import WeatherIcons from 'containers/Weather/WeatherIcons/WeatherIcons';
import WeatherDay from 'containers/Weather/WeatherDay/WeatherDay';
import WeatherHour from 'containers/Weather/WeatherHour/WeatherHour';
import WeatherSummary from 'containers/Weather/WeatherSummary/WeatherSummary';

import { getWeekday, formatTemp } from 'modules/weather/helpers';

const WeatherDetail = props => {
  const { data } = props;
  const baseClass = 'weather-detail';
  const headerClass = `${baseClass}-header`;
  const weekday = getWeekday();

  if (!data) {
    return null;
  }

  const { currently, daily, hourly } = data;
  const [today] = daily.data;
  const [currentHour] = hourly.data;

  return (
    <div className={baseClass}>
      <WeatherBackground name={currently.icon} />
      <header className={headerClass}>
        <WeatherIcons />
        <Text className={`${headerClass}-location`} element="h1">
          {data.city}
        </Text>
        <Text className={`${headerClass}-description`} element="h2">
          {currently.summary}
        </Text>
        <Text className={`${headerClass}-temperature`} element="h3">
          {formatTemp(currently.temperature)}
        </Text>
      </header>
      <div className={`${baseClass}-body`}>
        <div className={`${baseClass}-today`}>
          <div className={`${baseClass}-today-day`}>
            <Text>{weekday}</Text>
            <Text className={`${baseClass}-today-day-label`}>Today</Text>
          </div>
          <div className={`${baseClass}-today-temperature`}>
            <Text className={`${baseClass}-today-temperature-high`}>
              {formatTemp(today.temperatureHigh, false)}
            </Text>
            <Text className={`${baseClass}-today-temperature-low`}>
              {formatTemp(today.temperatureLow, false)}
            </Text>
          </div>
        </div>
        <div className={`${baseClass}-hourly`}>
          <ul className={`${baseClass}-hourly-list`}>
            {hourly.data.slice(0, 24).map(hour => (
              <WeatherHour key={hour.time} {...hour} />
            ))}
          </ul>
        </div>
        <div className={`${baseClass}-daily`}>
          <ul className={`${baseClass}-daily-list`}>
            {daily.data.slice(1).map(day => (
              <WeatherDay key={day.time} {...day} />
            ))}
          </ul>
          <WeatherSummary currentHour={currentHour} today={today} />
        </div>
      </div>
    </div>
  );
};

WeatherDetail.propTypes = {
  data: PropTypes.object
};

export default WeatherDetail;
