import { differenceInDays, differenceInHours } from 'date-fns';

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
