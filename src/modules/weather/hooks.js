import { useEffect, useRef, useState } from 'react';

import {
  useGeolocation,
  useFetchAndCache,
  useFetchAllAndCache
} from 'modules/browser/hooks';
import { GEOCODE_API, WEATHER_API } from './constants';
import { getWeatherEndpoint } from './helpers';

export const useLocation = (coordinates, key) => {
  const [endpoint, setEndpoint] = useState(null);
  const response = useFetchAndCache(endpoint, 'location', '1D');

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    const { latitude, longitude } = coordinates;

    setEndpoint(`${GEOCODE_API}/${latitude},${longitude}`);
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

    setEndpoint(`${WEATHER_API}/${latitude},${longitude}`);
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

export const useWeatherBackground = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const handlePlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function step() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  };

  return [canvasRef, videoRef, handlePlay];
};
