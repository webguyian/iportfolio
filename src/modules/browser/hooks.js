import { useEffect, useRef, useState } from 'react';

import { DEFAULT_COORDINATES } from './constants';
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

export const useStorageCache = (key, currentValue, deleteFn) => {
  const getValue = () => {
    try {
      // Get item from local storage with key
      const item = window.localStorage.getItem(key);

      // Parse stored JSON or if none return undefined
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      // If error return undefined
      return undefined;
    }
  };

  const value = getValue();
  const localRef = useRef(value);
  const [storedValue, setStoredValue] = useState(value);

  const setValue = nextValue => {
    try {
      // Save to state and local storage
      setStoredValue(nextValue);

      if (deleteFn && deleteFn(nextValue)) {
        // Remove item from local storage
        window.localStorage.removeItem(key);
      } else {
        if (typeof nextValue === 'object' && !(nextValue instanceof Array)) {
          if (nextValue !== storedValue) {
            // Include timestamp on objects
            nextValue.timestamp = Date.now();
          }
        }

        // Update value in local storage
        window.localStorage.setItem(key, JSON.stringify(nextValue));
      }
    } catch (error) {
      // Drop error
    }
  };

  useEffect(() => {
    // Update local value
    localRef.current = currentValue || storedValue;
  }, [currentValue, storedValue]);

  useEffect(() => {
    return () => {
      if (key && localRef.current) {
        setValue(localRef.current);
      }
    };
  }, []);

  return localRef.current;
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
      navigator.geolocation.getCurrentPosition(
        position => {
          setCoordinates(position.coords);
        },
        () => {
          setCoordinates(DEFAULT_COORDINATES);
        }
      );
    } else {
      setCoordinates(DEFAULT_COORDINATES);
    }
  }, []);

  return coordinates;
};
