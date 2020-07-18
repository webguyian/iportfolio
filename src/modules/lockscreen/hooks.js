import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useFetchAndCache } from 'modules/browser/hooks';
import { API_UNLOCK } from './constants';

export const useLockscreen = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [endpoint, setEndpoint] = useState('');
  const data = useFetchAndCache(endpoint, 'lockscreen', '1D');
  const history = useHistory();
  const handleToggle = () => {
    setUnlocked(true);
  };
  const handleUnlock = event => {
    if (event.target === event.currentTarget) {
      history.push('/home');
    }
  };

  useEffect(() => {
    if (unlocked && !data) {
      setEndpoint(API_UNLOCK);
    }
  }, [data, unlocked]);

  return [unlocked, handleToggle, handleUnlock];
};
