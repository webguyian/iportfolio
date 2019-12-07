import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const useRefFocus = (condition = true, initial = null) => {
  const ref = useRef(initial);

  useEffect(() => {
    const element = ref && ref.current;

    if (condition && element) {
      // Add focus to element
      element.focus();
    }
  }, [condition, ref]);

  return ref;
};

export const useSwipeOffset = (initial = 0) => {
  const [offset, setOffset] = useState(initial);
  const maxOffset = -30;

  const handleSwipe = eventInfo => {
    if (eventInfo.dir !== 'Down') {
      // Exit early if not down swipe
      return false;
    }

    setOffset(eventInfo.deltaY);
  };

  const handleSwipeUp = () => {
    if (!offset) {
      // Exit early with no offset
      return false;
    }

    setOffset(0);
  };

  const handlers = useSwipeable({
    onSwipedUp: handleSwipeUp,
    onSwiping: handleSwipe,
    trackMouse: true
  });

  return [handlers, offset < maxOffset, setOffset];
};
