import React from 'react';
import { create } from 'react-test-renderer';

import { initialStocks } from 'containers/Stocks/constants';
import * as hooks from 'containers/Stocks/hooks';
import StockTicker from './StockTicker';

describe('<StockTicker />', () => {
  // Override prop warning from react-stockcharts
  console.warn = jest.fn();
  hooks.useStockTicker = jest.fn();

  const stocks = [
    {
      c: 320.03,
      h: 320.03,
      l: 319,
      o: 319.365,
      pc: 320.03,
      symbol: 'AAPL',
      displaySymbol: 'AAPL',
      description: 'APPLE INC',
      price: 320.9,
      previousPrice: 320.03,
      chartData: {
        data: [
          {
            date: '2020-02-10T09:00:00.000Z',
            timestamp: 1581325200,
            close: 318
          },
          {
            date: '2020-02-10T09:01:00.000Z',
            timestamp: 1581325260,
            close: 318.25
          },
          {
            date: '2020-02-10T09:04:00.000Z',
            timestamp: 1581325440,
            close: 318.32
          },
          {
            date: '2020-02-10T09:05:00.000Z',
            timestamp: 1581325500,
            close: 318.4
          },
          {
            date: '2020-02-10T09:06:00.000Z',
            timestamp: 1581325560,
            close: 318.4
          }
        ],
        start: 318,
        startDate: '2020-02-10T09:00:00.000Z',
        end: 320.9,
        endDate: '2020-02-11T00:59:00.000Z',
        range: '1D'
      }
    },
    {
      c: 2079,
      h: 2080,
      l: 2077.01,
      o: 2079,
      pc: 2078.08,
      symbol: 'AMZN',
      displaySymbol: 'AMZN',
      description: 'AMAZON.COM INC',
      price: 2140,
      previousPrice: 2079.28,
      chartData: {
        data: [
          {
            date: '2020-02-10T10:40:00.000Z',
            timestamp: 1581331200,
            close: 2082
          },
          {
            date: '2020-02-10T10:48:00.000Z',
            timestamp: 1581331680,
            close: 2081.99
          },
          {
            date: '2020-02-10T11:17:00.000Z',
            timestamp: 1581333420,
            close: 2083
          },
          {
            date: '2020-02-10T11:36:00.000Z',
            timestamp: 1581334560,
            close: 2084.79
          },
          {
            date: '2020-02-10T11:41:00.000Z',
            timestamp: 1581334860,
            close: 2089.85
          }
        ],
        start: 2082,
        startDate: '2020-02-10T10:40:00.000Z',
        end: 2138.8,
        endDate: '2020-02-11T00:53:00.000Z',
        range: '1D'
      }
    }
  ];

  const props = {
    stocks: initialStocks,
    onClick: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const component = create(<StockTicker {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly without stocks', () => {
    const component = create(<StockTicker {...props} stocks={[]} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly without stockData', () => {
    hooks.useStockTicker.mockReturnValue([]);

    const component = create(<StockTicker {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with stockData', () => {
    hooks.useStockTicker.mockReturnValue(stocks);

    const component = create(<StockTicker {...props} />);

    expect(component).toMatchSnapshot();
  });
});
