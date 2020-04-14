import { useEffect, useRef, useState } from 'react';

import { getInitialCalendar, getYear } from './helpers';

export const useYearView = () => {
  const [id, setId] = useState(null);
  const [yearView, setYearView] = useState(false);
  const toggleView = event => {
    setId(event.currentTarget.id);
    setYearView(view => !view);
  };

  useEffect(() => {
    if (id) {
      let target;

      if (id.startsWith('goto')) {
        const yearId = `year-${id.split('-')[1]}`;

        target = document.getElementById(yearId);
      } else {
        target = document.getElementById(id);
      }

      if (target) {
        target.scrollIntoView();
      }
    }
  }, [id]);

  return [yearView, toggleView];
};

export const useCalendar = () => {
  const [yearView, toggleView] = useYearView();
  const [scrollId, setScrollId] = useState(null);
  const yearRef = useRef(null);
  const calendar = getInitialCalendar();
  const currentYear = getYear();
  const callback = entries => {
    const { isIntersecting, target } = entries[0];

    if (isIntersecting) {
      const id = target.id.split('-')[1];

      setScrollId(id);
    }
  };

  useEffect(() => {
    const yearElement = yearRef.current;

    if (!yearView && yearElement && yearElement.children.length) {
      const observer = new IntersectionObserver(callback, {
        root: yearElement,
        threshold: 0.2
      });

      Array.from(yearElement.children).forEach(child => {
        observer.observe(child.firstChild);
      });

      if (!scrollId) {
        // Set current year
        setScrollId(currentYear);
      }

      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, [yearRef, yearView, scrollId]);

  return [calendar, yearRef, scrollId, yearView, toggleView];
};

export const useGoToToday = yearView => {
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const options = {
    behavior: 'smooth'
  };

  const scrollToToday = event => {
    const monthElement = monthRef.current;
    const yearElement = yearRef.current;

    if (yearView && yearElement) {
      yearElement.scrollIntoView(options);
    } else if (monthElement) {
      window.scrollTo(0, 0);
      monthElement.scrollIntoView(options);
    }

    event.target.blur();
  };

  useEffect(() => {
    const year = getYear();
    const yearElement = document.getElementById(`year-${year}`);
    const ref = monthRef.current;

    if (yearElement) {
      yearRef.current = yearElement;
    }

    if (ref) {
      // Scroll to current month
      ref.scrollIntoView();
      window.scrollTo(0, 0);
    }
  }, [monthRef.current]);

  return [monthRef, scrollToToday];
};
