import { useEffect, useRef, useState } from 'react';

export const useDateTime = (stopped, onUpdate, initial) => {
  const initialTime = initial || Date.now();
  const [millis, setMillis] = useState(initialTime);
  const request = useRef(0);

  const tick = () => {
    const ms = Date.now();

    setMillis(ms);

    request.current = requestAnimationFrame(tick);

    if (onUpdate) {
      onUpdate(new Date(ms));
    }
  };

  useEffect(() => {
    if (stopped) {
      cancelAnimationFrame(request.current);
    } else {
      request.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(request.current);
    };
  }, [stopped]);

  return millis;
};
