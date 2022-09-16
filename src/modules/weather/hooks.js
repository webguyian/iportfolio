import { useEffect, useState } from 'react';

import {
  useGeolocation,
  useFetchAndCache,
  useFetchAllAndCache
} from 'modules/browser/hooks';
import { API_GEOCODE, API_WEATHER } from './constants';
import { getWeatherEndpoint } from './helpers';

export const useLocation = (coordinates, key) => {
  const [endpoint, setEndpoint] = useState(null);
  const response = useFetchAndCache(endpoint, 'location', '1D');

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    const { latitude, longitude } = coordinates;

    setEndpoint(`${API_GEOCODE}/${latitude},${longitude}`);
  });

  if (!response) {
    return null;
  }

  return key ? response.address_components[key] : response.address_components;
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

    setEndpoint(`${API_WEATHER}/${latitude},${longitude}`);
  }, [coordinates]);

  return [weather, city];
};

export const useWeatherLocations = locations => {
  const [data, setData] = useState(locations);
  const endpoints = locations.map(getWeatherEndpoint);
  const response = useFetchAllAndCache(endpoints, 'weather-locations', '2H');

  useEffect(() => {
    if (response.length) {
      const updatedData = locations.map((location, index) => ({
        ...location,
        ...response[index]
      }));

      setData(updatedData);
    }
  }, [response]);

  return data;
};
