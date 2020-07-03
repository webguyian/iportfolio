import { addMilliseconds } from 'date-fns';

export const getLapIndex = (index, laps) => {
  const nonEmptyLaps = laps.filter(lap => lap > 0);
  const nonEmptyLength = nonEmptyLaps.length;

  if (nonEmptyLength) {
    return nonEmptyLength - index;
  }

  return -(laps.length - index);
};

export const getTimeDisplay = time => {
  return addMilliseconds(new Date(0), time);
};

export const getRangeArray = max => {
  return [...Array(max).keys()];
};

export const getSeconds = values => {
  const { hours, minutes, seconds } = values;

  const hoursInSeconds = hours * 60 * 60;
  const minutesInSeconds = minutes * 60;

  return hoursInSeconds + minutesInSeconds + seconds;
};

export const getExpiration = (duration, cache) => {
  const cacheSeconds = cache && cache.allSeconds;

  if (cache && cache.running) {
    const expirationDate = new Date(cache.timestamp);

    expirationDate.setSeconds(expirationDate.getSeconds() + cacheSeconds);

    return expirationDate;
  } else if (cacheSeconds) {
    // Use current duration if it does not match cached duration
    const offset = duration !== cache.duration ? duration : cacheSeconds;
    const expirationDate = new Date();

    expirationDate.setSeconds(expirationDate.getSeconds() + offset);

    return expirationDate;
  }

  const expirationDate = new Date();

  expirationDate.setSeconds(expirationDate.getSeconds() + duration);

  return expirationDate;
};

export const getExpirationValues = distance => {
  const hours = Math.floor((distance % (60000 * 60 * 24)) / (60000 * 60));
  const minutes = Math.floor((distance % (60000 * 60)) / 60000);
  const seconds = (distance % 60000) / 1000;

  return {
    hours,
    minutes,
    seconds: Math.floor(Number(seconds.toFixed(1)))
  };
};
