import React from 'react';
import { act, create } from 'react-test-renderer';

import StockChart from './StockChart';

describe('<StockChart />', () => {
  // Override prop warning from react-stockcharts
  console.warn = jest.fn();
  const stock = {
    c: 183.63,
    h: 183.74,
    l: 183.5,
    o: 183.7,
    pc: 183.7,
    symbol: 'MSFT',
    displaySymbol: 'MSFT',
    description: 'MICROSOFT CORP',
    price: 188.7,
    previousPrice: 183.89,
    chartData: {
      data: [
        {
          date: '2020-02-10T09:00:00.000Z',
          timestamp: 1581325200,
          close: 184
        },
        {
          date: '2020-02-10T09:03:00.000Z',
          timestamp: 1581325380,
          close: 183.96
        },
        {
          date: '2020-02-10T09:04:00.000Z',
          timestamp: 1581325440,
          close: 184.1
        },
        {
          date: '2020-02-10T09:12:00.000Z',
          timestamp: 1581325920,
          close: 184.23
        },
        {
          date: '2020-02-10T09:16:00.000Z',
          timestamp: 1581326160,
          close: 184.44
        },
        {
          date: '2020-02-10T09:18:00.000Z',
          timestamp: 1581326280,
          close: 184.26
        },
        {
          date: '2020-02-10T09:20:00.000Z',
          timestamp: 1581326400,
          close: 184.33
        },
        {
          date: '2020-02-10T09:37:00.000Z',
          timestamp: 1581327420,
          close: 184.35
        },
        {
          date: '2020-02-10T09:43:00.000Z',
          timestamp: 1581327780,
          close: 184.2
        },
        {
          date: '2020-02-10T09:45:00.000Z',
          timestamp: 1581327900,
          close: 184.1
        }
      ],
      start: 184,
      startDate: '2020-02-10T09:00:00.000Z',
      end: 189.68,
      endDate: '2020-02-11T00:59:00.000Z',
      range: '1D'
    }
  };

  it('renders correctly', async () => {
    let component;

    await act(async () => {
      component = create(<StockChart stock={stock} />);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly without controls', async () => {
    let component;

    await act(async () => {
      component = create(<StockChart stock={stock} hideControls />);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly without chartData', async () => {
    const noData = {
      ...stock,
      chartData: null
    };

    let component;

    await act(async () => {
      component = create(<StockChart stock={noData} hideControls />);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with downgrade', async () => {
    const downStock = {
      ...stock,
      chartData: {
        ...stock.chartData,
        end: 180
      }
    };

    let component;

    await act(async () => {
      component = create(<StockChart stock={downStock} hideControls />);
    });

    expect(component).toMatchSnapshot();
  });
});
