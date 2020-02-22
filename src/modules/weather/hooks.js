import { useEffect, useState } from 'react';

import {
  useGeolocation,
  useFetchAndCache,
  useFetchAllAndCache
} from 'modules/browser/hooks';
import { GEOCODE_REVERSE_API, WEATHER_API } from './constants';
import { getWeatherEndpoint } from './helpers';

export const useLocation = (coordinates, key) => {
  const [endpoint, setEndpoint] = useState(null);
  const response = useFetchAndCache(endpoint, 'location', '1D');

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    const { latitude, longitude } = coordinates;

    setEndpoint(`${GEOCODE_REVERSE_API}&q=${latitude},${longitude}`);
  });

  if (!response) {
    return null;
  }

  const [firstResult] = response.results;

  return key
    ? firstResult.address_components[key]
    : firstResult.address_components;
};

export const useCurrentWeather = () => {
  const coordinates = useGeolocation();
  const city = useLocation(coordinates, 'city');
  const [endpoint, setEndpoint] = useState(null);
  const weather = useFetchAndCache(endpoint, 'weather', '2H');

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    const { latitude, longitude } = coordinates;
    const excluded = 'minutely,alerts,flags';

    setEndpoint(`${WEATHER_API}/${latitude},${longitude}?exclude=${excluded}`);
  }, [coordinates]);

  return [weather, city];
};

export const useWeatherLocations = locations => {
  const endpoints = locations.map(getWeatherEndpoint);
  const response = useFetchAllAndCache(endpoints, 'weather-locations', '2H');

  if (response.length) {
    return locations.map((location, index) => ({
      ...location,
      ...response[index]
    }));
  }

  return locations;
};
