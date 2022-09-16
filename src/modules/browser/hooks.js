import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import { DEFAULT_COORDINATES, API_TOKEN } from './constants';
import { getOptions, isExpired, isNotExpired } from './helpers';

export const useBreakpoint = breakpoint => {
  const [matchesBreakpoint, setBreakpoint] = useState(true);
  const mediaQuery = `(max-width: ${breakpoint}px)`;

  const handleResize = () => {
    const matches = window.matchMedia(mediaQuery).matches;

    setBreakpoint(matches);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return matchesBreakpoint;
};

export const useRefFocus = (node = null) => {
  const ref = useRef(node);

  useEffect(() => {
    const element = ref && ref.current;

    if (element) {
      // Add focus to element
      element.focus();
    }
  }, [ref]);

  return ref;
};

export const useInitialRoute = (match, path) => {
  const history = useHistory();

  useEffect(() => {
    if (match.isExact) {
      history.push(path);
    }
  }, []);

  return history;
};

export const useLocalStorage = (key, defaultValue, deleteFn) => {
  const getValue = () => {
    try {
      // Get item from local storage with key
      const item = window.localStorage.getItem(key);

      // Parse stored JSON or if none return defaultValue
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      // If error return defaultValue
      return defaultValue;
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
        if (
          typeof valueToStore === 'object' &&
          !(valueToStore instanceof Array)
        ) {
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

export const useToken = url => {
  const [token, setToken] = useState(null);
  const cache = useStorageCache('jwt', token);
  const fetchData = async () => {
    const response = await fetch(API_TOKEN);
    const result = await response.json();

    setToken(result);
  };

  useEffect(() => {
    if (!url || token) {
      // Exit early if token exists
      return;
    }

    if (cache && isNotExpired(cache)) {
      // Set token from cache
      setToken(cache);
    } else if (url) {
      // Call API to get token
      fetchData();
    }
  }, [cache, token, url]);

  return token;
};

export const useFetch = (endpoint, overrides) => {
  const [data, setData] = useState(null);
  const jwt = useToken(endpoint);

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

  useEffect(() => {
    if (response) {
      setUrl('');
    }
  }, [response]);

  return response;
};

export const useFetchWithFormData = (endpoint, data) => {
  const [url, setUrl] = useState('');
  const [options, setOptions] = useState(null);
  const response = useFetch(url, options);

  useEffect(() => {
    if (!endpoint || !data) {
      return;
    }

    const setData = async () => {
      const formData = new FormData();

      for (const key of Object.keys(data)) {
        if (key === 'attachment') {
          // Covert base64 data to blob
          const blob = await fetch(data[key]).then(res => res.blob());

          formData.append(key, blob, 'image.png');
        } else {
          formData.append(key, data[key]);
        }
      }

      const jwt = JSON.parse(window.localStorage.getItem('jwt'));
      const requestOptions = {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${jwt.token}`
        },
        body: formData
      };

      setOptions(requestOptions);
      setUrl(endpoint);
    };

    setData();
  }, [endpoint, data]);

  useEffect(() => {
    if (response) {
      setUrl('');
    }
  }, [response]);

  return response;
};

export const useFetchAll = urls => {
  const jwt = useToken(urls && urls[0]);
  const [responses, setResponses] = useState([]);

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
  }, [urls, jwt]);

  return responses;
};

export const useFetchAndCache = (url, key, expiration) => {
  const [endpoint, setEndpoint] = useState('');
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

export const useVideoCanvas = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const defaultFormat = 'image/png';
  const getElements = () => {
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext('2d');
    const video = videoRef.current;

    return {
      canvas,
      context,
      video
    };
  };

  const onPlay = () => {
    const { canvas, context, video } = getElements();

    function step() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      requestAnimationFrame(step);
    }

    if (!video.paused) {
      requestAnimationFrame(step);
    }
  };

  const takePhoto = (format = defaultFormat) => {
    const { canvas, context, video } = getElements();

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL(format);
  };

  const clearPhoto = (format = defaultFormat) => {
    const { canvas, context } = getElements();

    context.fillStyle = '#1c1c1e';
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas.toDataURL(format);
  };

  const actions = {
    onPlay,
    takePhoto,
    clearPhoto
  };

  return [canvasRef, videoRef, actions];
};

export const useSwipeVertical = (callback, offset = 80) => {
  const handleSwipeUp = eventInfo => {
    const { deltaY } = eventInfo;

    if (deltaY > offset) {
      callback(eventInfo);
    }
  };

  const handleSwipeDown = eventInfo => {
    const { deltaY } = eventInfo;

    if (deltaY < -offset) {
      callback(eventInfo);
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: handleSwipeUp,
    onSwipedDown: handleSwipeDown,
    trackMouse: true
  });

  return handlers;
};
