import { useEffect, useRef, useState } from 'react';

export const useSettings = () => {
  const [active, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef();
  const handleClick = setting => {
    if (setting) {
      setActive(s => !s);
    } else {
      setActive(false);
    }
  };
  const handleScroll = () => {
    const { scrollTop } = scrollRef.current;
    const el = document.body.querySelector('.iportfolio-app-device');
    const activeClass = 'iportfolio-app-device--faded-dark';

    if (scrollTop >= 20) {
      setScrolled(true);

      el.classList.add(activeClass);
    } else {
      setScrolled(false);

      el.classList.remove(activeClass);
    }
  };
  const state = {
    active,
    scrolled
  };

  useEffect(() => {
    const ref = scrollRef.current;

    if (ref) {
      ref.addEventListener('scroll', handleScroll);
    }

    return () => {
      ref.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef.current]);

  return [state, scrollRef, handleClick];
};

export const useSetting = setting => {
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const backBtn = useRef();
  const handleClearCache = () => {
    const keys = setting.cacheKeys || [setting.id];

    keys.forEach(key => {
      window.localStorage.removeItem(key);
    });

    setDisabled(true);
  };
  const handleNavigate = event => {
    if (event) {
      setActive(state => !state);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    if (backBtn.current) {
      backBtn.current.focus();
    }
  }, [backBtn.current]);

  const actions = {
    onClearCache: handleClearCache,
    onNavigate: handleNavigate
  };
  const state = {
    active,
    disabled
  };

  return [backBtn, actions, state];
};
