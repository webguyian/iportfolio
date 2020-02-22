import { useEffect, useState } from 'react';

import { useStorageCache } from 'hooks';
import { isExpired } from './helpers';

export const useFetch = (endpoint, options) => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await fetch(endpoint, options);
    const result = await response.json();

    setData(result);
  };

  useEffect(() => {
    if (!endpoint) {
      return;
    }

    fetchData();
  }, [endpoint]);

  return data;
};

export const useFetchAll = urls => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        urls.map(async url => {
          const response = await fetch(url);

          return response.json();
        })
      );

      setResponses(results);
    };

    if (urls && urls.length) {
      fetchData();
    }
  }, [urls]);

  return responses;
};

export const useFetchAndCache = (url, key, expiration) => {
  const [endpoint, setEndpoint] = useState(null);
  const response = useFetch(endpoint);
  const cache = useStorageCache(key, response);
  const cacheExpired = cache && isExpired(cache.timestamp, expiration);

  useEffect(() => {
    if (url) {
      if (!cache || cacheExpired) {
        // Fetch if no cache or cache is expired
        setEndpoint(url);
      }
    }
  }, [url]);

  return cache && !cacheExpired ? cache : response;
};

export const useFetchAllAndCache = (urls, key, expiration) => {
  const [endpoints, setEndpoints] = useState([]);
  const [cacheData, setCacheData] = useState();
  const response = useFetchAll(endpoints);
  const cache = useStorageCache(key, cacheData, res => !res[key].length);

  useEffect(() => {
    if (urls && urls.length) {
      if (cache) {
        const expired = isExpired(cache.timestamp, expiration);

        if (!expired) {
          // Exit early if cache is not expired
          return;
        }
      }

      if (!endpoints.length) {
        // Trigger fetch on URLs
        setEndpoints(urls);
      }
    }
  }, [urls]);

  useEffect(() => {
    if (response.length) {
      // Update cache data with response
      setCacheData({ [key]: response });
    }
  }, [response]);

  return (cache && cache[key]) || response;
};

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoordinates(position.coords);
      });
    }
  }, []);

  return coordinates;
};
