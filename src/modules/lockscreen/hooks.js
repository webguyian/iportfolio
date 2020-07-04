import { useEffect, useState } from 'react';

import { useFetchAndCache } from 'modules/browser/hooks';
import { API_UNLOCK } from './constants';

export const useLockscreen = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [endpoint, setEndpoint] = useState('');
  const data = useFetchAndCache(endpoint, 'lockscreen', '1D');
  const handleUnlock = () => {
    setEndpoint(API_UNLOCK);
  };

  useEffect(() => {
    if (endpoint && data) {
      setUnlocked(true);
    }
  }, [data, endpoint]);

  return [unlocked, handleUnlock];
};
