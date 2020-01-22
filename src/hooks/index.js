import { useEffect, useState } from 'react';

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
