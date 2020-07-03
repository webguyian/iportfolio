import {
  differenceInDays,
  differenceInHours,
  fromUnixTime,
  isAfter
} from 'date-fns';

export const getOptions = (jwt, overrides = {}) => {
  return {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${jwt.token}`,
      'Content-Type': 'application/json'
    },
    ...overrides
  };
};

export const isExpired = (timestamp, expiration, startDate = new Date()) => {
  const [amount, unit] = expiration.split('');
  const number = Number(amount);

  let difference;

  if (unit === 'H') {
    difference = differenceInHours(startDate, new Date(timestamp));
  } else {
    difference = differenceInDays(startDate, new Date(timestamp));
  }

  return difference > number;
};

export const isNotExpired = (cache, today = new Date()) => {
  const date = fromUnixTime(cache.expires);

  return isAfter(date, today);
};
