import { useEffect, useRef, useState } from 'react';

import { DEFAULT_COORDINATES, TOKEN_API } from './constants';
import { getOptions, isExpired, isNotExpired } from './helpers';

export const useLocalStorage = (key, currentValue, deleteFn) => {
  const getValue = () => {
    try {
      // Get item from local storage with key
      const item = window.localStorage.getItem(key);

      // Parse stored JSON or if none return currentValue
      return item ? JSON.parse(item) : currentValue;
    } catch (error) {
      // If error return currentValue
      return currentValue;
    }
  };
  const [storedValue, setStoredValue] = useState(getValue);
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      if (deleteFn && deleteFn(valueToStore)) {
        // Remove item from local storage
        window.localStorage.removeItem(key);
      } else {
        if (typeof nextValue === 'object' && !(valueToStore instanceof Array)) {
          if (valueToStore !== storedValue) {
            // Include timestamp on objects
            valueToStore.timestamp = Date.now();
          }
        }

        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Drop error
    }
  };

  return [storedValue, setValue, getValue];
};

export const useStorageCache = (key, currentValue, deleteFn) => {
  const [storedValue, setValue] = useLocalStorage(key, currentValue, deleteFn);
  const localRef = useRef(storedValue);

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

export const useToken = () => {
  const [token, setToken] = useState(null);
  const cache = useStorageCache('jwt', token);
  const fetchData = async () => {
    const response = await fetch(TOKEN_API);
    const result = await response.json();

    setToken(result);
  };

  useEffect(() => {
    if (!token && cache && isNotExpired(cache)) {
      setToken(cache);
    } else if (!token) {
      fetchData();
    }
  }, [cache]);

  return token;
};

export const useFetch = (endpoint, overrides) => {
  const [data, setData] = useState(null);
  const jwt = useToken();

  const fetchData = async () => {
    const options = getOptions(jwt, overrides);
    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (!result.error) {
      setData(result);
    } else {
      // Handle error
    }
  };

  useEffect(() => {
    if (!endpoint || !jwt) {
      return;
    }

    fetchData();
  }, [endpoint, jwt]);

  return data;
};

export const useFetchWithData = (endpoint, data) => {
  const [url, setUrl] = useState('');
  const [options, setOptions] = useState(null);
  const response = useFetch(url, options);

  useEffect(() => {
    if (!endpoint || !data) {
      return;
    }

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data)
    };

    setOptions(requestOptions);
    setUrl(endpoint);
  }, [endpoint, data]);

  return response;
};

export const useFetchAll = urls => {
  const [responses, setResponses] = useState([]);
  const jwt = useToken();

  useEffect(() => {
    const fetchData = async () => {
      const options = getOptions(jwt);
      const results = await Promise.all(
        urls.map(async url => {
          const response = await fetch(url, options);

          return response.json();
        })
      );

      setResponses(results);
    };

    if (urls && urls.length && jwt) {
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
