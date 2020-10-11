import { useEffect, useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useLocalStorage } from 'modules/browser/hooks';

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

export const useReminders = (initial = []) => {
  const [reminders, setReminders] = useLocalStorage('reminders', initial);
  const [focusedInput, setFocusedInput] = useState(null);
  const remindersRef = useRef(reminders);
  const add = () => {
    const id = Date.now();

    setReminders(() => reminders.concat([{ id, checked: false, value: '' }]));
    setFocusedInput(id);
  };

  const remove = id => {
    setReminders(() => reminders.filter(r => r.id !== id));
    setFocusedInput(null);
  };

  const update = updated => {
    const updatedReminders = reminders.map(reminder => {
      if (reminder.id === updated.id) {
        return {
          ...reminder,
          ...updated
        };
      }

      return reminder;
    });

    setReminders(() => updatedReminders);
  };

  const actions = {
    add,
    remove,
    update
  };

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

  return [reminders, focusedInput, actions];
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
