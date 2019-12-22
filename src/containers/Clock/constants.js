import { getRangeArray } from './helpers';

export const defaultTimeDisplay = '00:00.00';

export const initialLaps = Array(5).fill(0);

export const timeFormat = 'mm:ss.SS';

const hours = getRangeArray(24);
const minutes = getRangeArray(60);

export const initialValues = {
  hours: 0,
  minutes: 5,
  seconds: 30
};
export const optionGroups = {
  hours,
  minutes,
  seconds: minutes
};
export const labelGroups = {
  hours: 'hours',
  minutes: 'min',
  seconds: 'sec'
};
