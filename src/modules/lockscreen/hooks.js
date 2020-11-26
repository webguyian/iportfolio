import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useFetchAndCache, useSwipeVertical } from 'modules/browser/hooks';
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

export const useHomeRedirect = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const home = 'home';
  const homeRoute = `/${home}`;
  const icon = pathname === homeRoute ? 'lock-open' : home;
  const redirect = () => {
    const route = icon === home ? homeRoute : '/';

    history.push(route);
  };

  return [redirect, pathname, icon];
};

export const useSwipeHome = () => {
  const [onRedirect] = useHomeRedirect();
  const handleSwipe = eventInfo => {
    if (eventInfo.dir !== 'Up') {
      return;
    }

    const [, initialY] = eventInfo.initial;

    if (initialY > 500) {
      onRedirect();
    }
  };

  const handlers = useSwipeVertical(handleSwipe);

  return handlers;
};
