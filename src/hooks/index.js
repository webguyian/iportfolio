import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

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
