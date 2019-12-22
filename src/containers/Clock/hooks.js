import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { initialValues } from './constants';
import { getExpiration, getExpirationValues, getSeconds } from './helpers';

export const useInitialRoute = (match, path) => {
  const history = useHistory();

  useEffect(() => {
    if (match.isExact) {
      history.push(path);
    }
  }, []);

  return history;
};

export const useStorage = (key, currentValue, deleteKey, keepUpdating) => {
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

      if (deleteKey && !nextValue[deleteKey]) {
        // Remove item from local storage
        window.localStorage.removeItem(key);
      } else {
        // Update local storage and include timestamp
        nextValue.timestamp = Date.now();
        window.localStorage.setItem(key, JSON.stringify(nextValue));
      }
    } catch (error) {
      // Drop error
    }
  };

  useEffect(() => {
    // Update local value
    localRef.current = currentValue || storedValue;

    if (keepUpdating) {
      // Set update value in local storage
      setValue(localRef.current);
    }
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

export const useLaps = (initialLaps, timer, timerRunning) => {
  const [laps, setLaps] = useState(initialLaps);
  const hasLaps = laps.some(lap => lap > 0);
  const storage = useStorage(
    'stopwatch',
    {
      laps,
      timer,
      timerRunning
    },
    'timer'
  );

  const updateLaps = () => {
    if (timerRunning) {
      const hasEmptyLaps = laps.some(lap => lap === 0);

      if (hasEmptyLaps) {
        setLaps(updatedLaps => [
          0,
          ...updatedLaps.slice(0, updatedLaps.length - 1)
        ]);
      } else {
        setLaps(updatedLaps => [0, ...updatedLaps]);
      }
    } else {
      setLaps(initialLaps);
    }
  };

  useEffect(() => {
    if (storage && storage.laps) {
      setLaps(storage.laps);
    }
  }, []);

  useEffect(() => {
    if (!timerRunning || !timer) {
      return;
    }

    const lapLength = laps.length;

    if (!hasLaps && timer > 10) {
      setLaps(updatedLaps => [timer, ...updatedLaps]);
    }

    if (lapLength > 5) {
      setLaps(updatedLaps => {
        const truncatedLaps = updatedLaps.slice(1, lapLength);
        const offset = truncatedLaps.reduce((a, b) => a + b, 0);

        return [timer - offset, ...truncatedLaps];
      });
    }
  }, [timer, timerRunning, hasLaps]);

  return [laps, updateLaps, hasLaps];
};

export const useStopwatch = (startTime = 0, start = false) => {
  const [timerStarted, startTimer] = useState(start);
  const [interval, setLocalInterval] = useState(null);
  const [offset, setOffset] = useState(0);
  const timer = useRef(startTime);
  const storage = useStorage('stopwatch');
  const toggleTimer = () => startTimer(!timerStarted);
  const resetTimer = () => {
    timer.current = 0;
    return timer.current;
  };
  const getUpdatedTime = cache => {
    const now = Date.now();
    const diff = now - cache.timestamp;

    return cache.timer + diff;
  };

  useEffect(() => {
    if (storage && storage.timer) {
      // Get updated time from local storage
      if (storage.timerRunning) {
        timer.current = getUpdatedTime(storage);
        toggleTimer();
      } else {
        timer.current = storage.timer;
      }
    }
  }, []);

  useEffect(() => {
    let localOffset = offset;

    if (timerStarted && !interval) {
      localOffset = Date.now();

      const getDelta = () => {
        const now = Date.now();
        const delta = now - localOffset;

        localOffset = now;

        setOffset(now);
        return delta;
      };

      const localInterval = window.setInterval(() => {
        timer.current += getDelta();
      }, 1);

      setLocalInterval(localInterval);
    }

    if (!timerStarted && interval) {
      window.clearInterval(interval);
      setLocalInterval(null);
    }
  }, [timerStarted, timer, interval]);

  return [timer.current, timerStarted, toggleTimer, resetTimer];
};

export const useDuration = () => {
  const [values, setValues] = useState(null);
  const storage = useStorage('duration', values, null, true);
  const setDuration = (key, value) => {
    setValues({
      ...values,
      [key]: value
    });
  };
  const cachedValues = storage || values;
  const duration = cachedValues && getSeconds(cachedValues);

  useEffect(() => {
    if (storage) {
      // Update state with values from local storage
      setValues(storage);
    } else {
      // Set default initial values
      setValues(initialValues);
    }
  }, []);

  return [duration, setDuration, cachedValues, setValues];
};

export const useCountdown = (h = 0, m = 0, s = 0) => {
  const [seconds, setSeconds] = useState(s);
  const [minutes, setMinutes] = useState(m);
  const [hours, setHours] = useState(h);
  const allSeconds = getSeconds({ hours, minutes, seconds });

  const subtractHour = () => {
    setHours(prevHours => {
      if (prevHours === 0) {
        return 23;
      } else if (prevHours > 0) {
        return prevHours - 1;
      }
      return 0;
    });
  };

  const subtractMinute = () => {
    setMinutes(prevMinutes => {
      if (prevMinutes === 0) {
        subtractHour();
        return 59;
      } else if (prevMinutes > 0) {
        return prevMinutes - 1;
      }
      return 0;
    });
  };

  const subtractSecond = () => {
    setSeconds(prevSeconds => {
      if (prevSeconds === 0) {
        subtractMinute();
        return 59;
      } else if (prevSeconds > 0) {
        return prevSeconds - 1;
      }
      return 0;
    });
  };

  const setCountdown = values => {
    if (!values) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      return;
    }

    setHours(values.hours);
    setMinutes(values.minutes);
    setSeconds(values.seconds);
  };

  return [
    {
      allSeconds,
      hours,
      minutes,
      seconds
    },
    setCountdown,
    subtractSecond
  ];
};

export const useTimer = duration => {
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [countdown, setCountdown, startCountdown] = useCountdown();
  const intervalRef = useRef();
  const storage = useStorage(
    'timer',
    {
      ...countdown,
      duration,
      running,
      started
    },
    'allSeconds'
  );

  const pause = () => {
    if (intervalRef.current) {
      setRunning(() => false);
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const reset = () => {
    pause();
    setCountdown(null);
    setStarted(false);
  };

  const calculateExpiration = expiration => {
    const distance = expiration - Date.now();
    const expirationValues = getExpirationValues(distance);

    if (countdown.allSeconds < 0) {
      reset();
    } else {
      setCountdown(expirationValues);
    }

    return expirationValues;
  };

  const start = expiration => {
    if (expiration && !intervalRef.current) {
      calculateExpiration(expiration);
    }
  };

  const resume = () => {
    if (!intervalRef.current) {
      setStarted(() => true);
      setRunning(() => true);
      intervalRef.current = setInterval(startCountdown, 1000);
    }
  };

  const restart = () => {
    const expiration = getExpiration(duration);

    reset();
    start(expiration);
  };

  const toggle = () => {
    if (!intervalRef.current) {
      resume();
    } else {
      pause();
    }
  };

  useEffect(() => {
    const expiration = getExpiration(duration, storage);

    start(expiration);

    if (storage) {
      if (storage.running) {
        resume();
      } else if (storage.started) {
        setStarted(true);
      }

      if (duration !== storage.duration) {
        // Remove timer from local storage
        window.localStorage.removeItem('timer');
      }
    }

    return pause;
  }, [duration]);

  return {
    ...countdown,
    duration,
    start,
    started,
    pause,
    reset,
    resume,
    restart,
    running,
    toggle
  };
};

export const useRadialOffset = (timer, radius) => {
  const circumference = (2 * radius * 22) / 7;
  const { allSeconds, duration } = timer;
  const [initialSeconds] = useState(allSeconds);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!offset) {
      const initialOffset = (allSeconds / duration) * circumference;
      const updatedOffset = circumference - Math.round(initialOffset);

      if (updatedOffset === circumference || updatedOffset < 0) {
        // Exit early
        return;
      }

      setOffset(updatedOffset);
    }
  }, [allSeconds, duration, offset]);

  return [offset, initialSeconds];
};
