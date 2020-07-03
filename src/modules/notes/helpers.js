import { compareDesc } from 'date-fns';

export const dateSort = (a, b) => compareDesc(a.date, b.date);
