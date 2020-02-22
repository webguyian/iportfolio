import { format, fromUnixTime } from 'date-fns';

import { WEATHER_API, WIND_DIRECTIONS } from './constants';

export const getHour = time => {
  if (!time) {
    return null;
  }

  const date = fromUnixTime(time);

  return format(date, 'ha');
};

export const getPercentage = value => {
  const percentage = Math.round(value * 100);

  return `${percentage}%`;
};

export const getPressure = millibars => {
  return (millibars / 33.864).toFixed(2);
};

export const getTime = time => {
  if (!time) {
    return null;
  }

  const date = fromUnixTime(time);

  return format(date, 'h:mma');
};

export const getWeekday = time => {
  const date = time ? fromUnixTime(time) : new Date();

  return format(date || new Date(), 'EEEE');
};

export const formatTemp = (temperature, withSymbol = true) => {
  const temp = Math.round(temperature);

  return withSymbol ? `${temp}°` : temp;
};

export const getTemp = location => {
  if (location && location.currently) {
    return formatTemp(location.currently.temperature);
  }

  return null;
};

export const getWeatherEndpoint = location => {
  const { lat, lon } = location.coordinates;
  const excluded = 'minutely,alerts,flags';

  return `${WEATHER_API}/${lat},${lon}?exclude=${excluded}`;
};

export const getWindDirection = bearing => {
  const remainder = Math.round(bearing / 22.5);

  return WIND_DIRECTIONS[remainder];
};
