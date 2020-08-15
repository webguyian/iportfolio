import { useEffect, useRef, useState, useCallback } from 'react';

import { getMobileOperatingSystem } from 'modules/browser/helpers';
import { useLocalStorage, useVideoCanvas } from 'modules/browser/hooks';
import { defaultSettings, initialFilters } from 'modules/camera/constants';
import { drawText } from 'modules/camera/helpers';

export const useVideoStream = videoRef => {
  useEffect(() => {
    const ref = videoRef.current;

    if (!ref) {
      // Exit early
      return;
    }

    const getStream = async () => {
      const constraints = {
        video: true,
        width: 375,
        height: 750,
        facingMode: 'user'
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (getMobileOperatingSystem() === 'iOS') {
        ref.addEventListener('loadeddata', () => {
          ref.play();
        });
      }

      ref.srcObject = stream;
      ref.load();
    };

    getStream();

    return () => {
      const source = ref.srcObject;
      const tracks = source && source.getTracks();

      if (tracks && tracks.length) {
        tracks.forEach(track => track.stop());
      }
    };
  }, [videoRef.current]);
};

export const useCameraControls = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const setControl = (key, value) => {
    setSettings(currentState => {
      return {
        ...currentState,
        [key]: value
      };
    });
  };
  const controls = {
    flash: {
      state: settings.flash,
      onClick: () => {
        if (settings.flash !== 'active') {
          setControl('flash', 'active');
        } else {
          setControl('flash', 'enabled');
        }
      }
    },
    timer: {
      state: settings.timer,
      onClick: () => {
        if (settings.timer !== 'active') {
          setControl('timer', 'active');
        } else {
          setControl('timer', 'enabled');
        }
      }
    },
    filter: {
      state: settings.filter,
      onClick: () => {
        if (settings.filter !== 'active') {
          setControl('filter', 'active');
        } else {
          setControl('filter', 'enabled');
        }
      }
    },
    swap: {
      state: settings.swap,
      onClick: () => {
        if (settings.swap !== 'active') {
          setControl('swap', 'active');
        } else {
          setControl('swap', 'enabled');
        }
      }
    }
  };

  useEffect(() => {
    if (getMobileOperatingSystem() !== 'iOS') {
      setControl('timer', 'enabled');
    }
  }, []);

  return controls;
};

export const useCameraFilters = (videoRef, canvasRef, filterState) => {
  const [activeFilter, setFilter] = useState(initialFilters[0].label);
  const defaultFilters =
    getMobileOperatingSystem() !== 'iOS'
      ? initialFilters
      : initialFilters.filter(f => !f.value.startsWith('url'));
  const filtersRef = useRef(defaultFilters);
  const handleFilter = filter => {
    const srcCanvas = canvasRef.current;
    const context = srcCanvas.getContext('2d');

    context.filter = filter.value;

    setFilter(filter.label);
  };

  useEffect(() => {
    const filters = filtersRef.current;

    if (!filters || !filters.length) {
      return;
    }

    filters.forEach(filter => {
      const srcVideo = videoRef.current;
      const dstCanvas = filter.ref;
      const dstContext = dstCanvas && dstCanvas.getContext('2d');

      function step() {
        dstContext.filter = filter.value;
        dstContext.drawImage(srcVideo, 0, 0, dstCanvas.width, dstCanvas.height);

        requestAnimationFrame(step);
      }

      if (srcVideo && dstContext) {
        requestAnimationFrame(step);
      }
    });

    filtersRef.current = filters;
  }, [canvasRef.current, filtersRef.current, filterState]);

  return [filtersRef, activeFilter, handleFilter];
};

export const useCamera = () => {
  const [canvasRef, videoRef, actions] = useVideoCanvas();
  const controls = useCameraControls();
  const [photos, setPhotos] = useLocalStorage('photos', [], d => !d.length);
  const [buttonState, setButtonState] = useState('enabled');
  const overlay = useRef();
  const intervalRef = useRef();
  const count = useRef(5);
  const photoCount = photos.length;
  const { onPlay, takePhoto } = actions;
  const [filters, activeFilter, onFilterClick] = useCameraFilters(
    videoRef,
    canvasRef,
    controls.filter.state
  );
  const captureImage = () => {
    const image = takePhoto();
    const data = {
      image,
      metadata: {
        dateCreated: Number(new Date()),
        filter: activeFilter
      }
    };

    setPhotos(photos.concat(data));
    setButtonState('enabled');
  };
  const counter = num => {
    const canvas = overlay.current;
    const { width, height } = canvas;
    const context = canvas.getContext('2d');
    const interval = intervalRef.current;

    context.clearRect(0, 0, width, height);

    drawText(`${num}`, context, width / 2, height / 2 + 60);

    if (!num) {
      clearInterval(interval);
      context.clearRect(0, 0, width, height);
      count.current = 5;
      captureImage();
    }
  };
  const counterCb = useCallback(counter, [intervalRef.current]);

  useVideoStream(videoRef);

  const handleClick = () => {
    setButtonState('disabled');

    if (controls.timer.state === 'active') {
      const interval = setInterval(() => {
        counterCb(count.current--);
      }, 1000);

      intervalRef.current = interval;

      return;
    }

    captureImage();
  };

  const getPhoto = () => {
    const lastIndex = photoCount - 1;

    if (!photoCount) {
      return null;
    }

    const lastPhoto = photos[lastIndex];

    return {
      ...lastPhoto,
      metadata: {
        ...lastPhoto.metadata,
        index: lastIndex
      }
    };
  };

  const elements = {
    button: buttonState,
    canvas: canvasRef,
    filters,
    activeFilter,
    video: videoRef,
    overlay,
    photo: getPhoto()
  };
  const updatedActions = {
    onClick: handleClick,
    onFilter: onFilterClick,
    onPlay
  };

  return [elements, updatedActions, controls];
};
