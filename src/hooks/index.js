import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const useBreakpoint = breakpoint => {
  const [matchesBreakpoint, setBreakpoint] = useState(false);
  const mediaQuery = `(max-width: ${breakpoint}px)`;

  const handleResize = () => {
    const matches = window.matchMedia(mediaQuery).matches;

    setBreakpoint(matches);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return matchesBreakpoint;
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

export const useSwipeOffset = (callback, initial = 0) => {
  const [offset, setOffset] = useState(initial);

  const handleSwipe = eventInfo => {
    if (eventInfo.dir !== 'Left') {
      // Exit early if not left swipe
      return false;
    }

    setOffset(eventInfo.deltaX);
  };

  const handleSwipeLeft = eventInfo => {
    const { deltaX } = eventInfo;

    if (deltaX > 80) {
      callback(eventInfo);
    }
  };

  const handleSwipeRight = () => {
    if (!offset) {
      // Exit early with no offset
      return false;
    }

    setOffset(0);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    onSwiping: handleSwipe,
    trackMouse: true
  });

  return [handlers, offset, setOffset];
};
