import {
  differenceInDays,
  differenceInHours,
  format,
  formatDistanceToNow,
  fromUnixTime,
  getUnixTime,
  isSaturday,
  isSunday,
  subDays,
  subWeeks,
  subMonths
} from 'date-fns';

import { API_CANDLESTICK, API_NEWS, API_QUOTE } from 'modules/stocks/constants';

export const formatDateTick = (range, date) => {
  switch (range) {
    case '1D':
      return format(date, 'h a');
    case '1W':
    case '1M':
    case '3M':
    case '6M':
      return format(date, 'MMM d');
    default:
      return format(date, 'd');
  }
};

export const formatPrice = amount => {
  return amount ? `${amount.toFixed(2)}` : '';
};

export const formatTimestamp = datetime => {
  if (!datetime) {
    return null;
  }

  const relativeDate = fromUnixTime(datetime);
  const distance = formatDistanceToNow(relativeDate);

  return `${distance} ago`;
};

export const getPercentage = (price, previousPrice) => {
  if (!price || !previousPrice) {
    return null;
  }

  const percentage = Math.abs((previousPrice / price - 1) * 100);
  const symbol = price > previousPrice ? '+' : '-';

  return `${symbol}${percentage.toFixed(2)}%`;
};

export const getDates = (range, date) => {
  let today = date || new Date();

  if (range === '1D') {
    // Override weekend dates
    if (isSaturday(today)) {
      today = subDays(today, 1);
    } else if (isSunday(today)) {
      today = subDays(today, 2);
    }
  }

  switch (range) {
    case '1D':
      return [subDays(today, 1), today];
    case '1W':
      return [subWeeks(today, 1), today];
    case '1M':
      return [subMonths(today, 1), today];
    case '3M':
      return [subMonths(today, 3), today];
    case '6M':
      return [subMonths(today, 6), today];
    default:
      return [];
  }
};

export const getUnixDates = (range, date) => {
  const [startDate, endDate] = getDates(range, date);

  return [getUnixTime(startDate), getUnixTime(endDate)];
};

export const getResolution = range => {
  switch (range) {
    case '1D':
      return 1;
    case '1W':
      return 5;
    case '1M':
      return 30;
    case '3M':
      return 30;
    case '6M':
      return 30;
    default:
      return 1;
  }
};

export const getCandlestickEndpoint = (symbol, range, date) => {
  const [startTime, endTime] = getUnixDates(range, date);
  const resolution = getResolution(range);
  const endpoint = `${API_CANDLESTICK}?symbol=${symbol}&resolution=${resolution}&from=${startTime}&to=${endTime}`;

  return endpoint;
};

export const getStockEndpoint = stock => {
  return `${API_QUOTE}/${stock.symbol}`;
};

export const getStockNewsEndpoint = company => {
  const topic = company ? `/${company}` : '';

  return `${API_NEWS}${topic}`;
};

export const isExpired = (date, startDate = new Date()) => {
  const difference = differenceInDays(startDate, date);

  return difference > 2;
};

export const isExpiredNews = (timestamp, startDate = new Date()) => {
  const date = fromUnixTime(timestamp);
  const difference = differenceInHours(startDate, date);

  return difference > 5;
};

export const updateChartData = (response, range) => {
  const data = response.t.reduce((acc, timestamp, index) => {
    const date = fromUnixTime(timestamp);

    acc.push({
      date,
      timestamp,
      close: response.c[index]
    });

    return acc;
  }, []);

  const [first] = data;
  const last = data[data.length - 1];

  return {
    data,
    start: first.close,
    startDate: first.date,
    end: last.close,
    endDate: last.date,
    range
  };
};

export const rehydrateChartData = response => {
  const { chartData } = response;

  return {
    ...response,
    chartData: {
      ...chartData,
      data: chartData.data.map(d => ({
        ...d,
        date: new Date(d.date)
      })),
      startDate: new Date(chartData.startDate),
      endDate: new Date(chartData.endDate)
    }
  };
};
