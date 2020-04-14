import { isToday } from 'date-fns';
import chunk from 'lodash/chunk';

export const createRange = (end, start = 1) => {
  return Array.from({ length: end - start + 1 }, (v, k) => k + start);
};

export const fillArray = (count, value = null) => {
  return Array(count).fill(value);
};

export const formatDate = (date, options) => {
  return date.toLocaleDateString('en-us', options);
};

export const getCalendarMonth = (startMonth, year) => {
  const month = startMonth - 1;
  const date = new Date(year, month, 1);
  const lastDay = new Date(year, 1 + month, 0).getDate();
  const range = createRange(lastDay);

  return range.map(day => {
    const current = new Date(year, month, day);

    return {
      day,
      month: formatDate(date, { month: 'long' }),
      monthAbbr: formatDate(date, { month: 'short' }),
      year,
      weekday: formatDate(current, { weekday: 'long' }),
      offset: current.getDay(),
      isToday: isToday(current)
    };
  });
};

export const getCalendarYear = year => {
  const months = createRange(12);

  return months.map(month => getCalendarMonth(month, year));
};

export const getYear = (date = new Date()) => {
  return date.getFullYear();
};

export const getOffsetYears = (year, offset) => {
  const count = Math.abs(offset);
  const arr = fillArray(count);
  const diff = year + offset;

  if (offset < 0) {
    return arr.map((_, i) => diff + i);
  }

  if (offset > 0) {
    return arr.map((_, i) => diff - i).reverse();
  }

  return [year - 1, year, year + 1];
};

export const getInitialYears = date => {
  const year = getYear(date);
  const previousYears = getOffsetYears(year, -2);
  const nextYears = getOffsetYears(year, 2);

  return previousYears.concat(year, nextYears);
};

export const getInitialCalendar = () => {
  const years = getInitialYears();

  return years.map(getCalendarYear);
};

export const getWeeks = month => {
  const { offset } = month[0];
  const diff = 7 - offset;
  const remainder = month.slice(diff);
  const otherWeeks = chunk(remainder, 7);
  const lastWeek = otherWeeks[otherWeeks.length - 1];
  const endDiff = 7 - lastWeek.length;
  const updatedLastWeek = lastWeek.concat(fillArray(endDiff));
  const firstWeek = fillArray(offset).concat(month.slice(0, diff));

  return [firstWeek, ...otherWeeks.slice(0, -1), updatedLastWeek];
};

export const isCurrentMonth = month => {
  const match = month.find(day => day.isToday);

  return Boolean(match);
};
