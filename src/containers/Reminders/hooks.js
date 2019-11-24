import { useEffect, useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

export const useLocalStorage = (key, initialValue) => {
  const getValue = () => {
    try {
      // Get item from local storage with key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error return initialValue
      return initialValue;
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
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Drop error
    }
  };

  return [storedValue, setValue, getValue];
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

export const useRefControlledFocus = (focused, node = null) => {
  const ref = useRef(node);

  useEffect(() => {
    const element = ref && ref.current;

    if (element && focused) {
      element.focus();
    }
  }, [focused]);

  return ref;
};

export const useReminders = (reminders, setReminders) => {
  const remindersRef = useRef(reminders);

  useEffect(() => {
    // Update reminders in ref
    remindersRef.current = reminders;
  });

  useEffect(() => {
    return () => {
      const { current } = remindersRef;
      const updatedReminders = current.filter(reminder =>
        reminder.value.trim()
      );

      // Trigger callback without empty reminders
      setReminders(updatedReminders);
    };
  }, [remindersRef]);

  return remindersRef;
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
