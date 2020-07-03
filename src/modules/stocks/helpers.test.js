import { originalDate, mockDate, mockTime } from 'utilities/test';

import * as helpers from './helpers';

describe('Stocks helpers', () => {
  describe('handles formatDateTick', () => {
    const cases = [
      ['1D', mockDate, '3 PM'],
      ['1W', mockDate, 'Oct 1'],
      ['1M', mockDate, 'Oct 1'],
      ['3M', mockDate, 'Oct 1'],
      ['6M', mockDate, 'Oct 1'],
      ['??', mockDate, '1']
    ];

    test.each(cases)('formats date by %p', (range, date, expected) => {
      expect(helpers.formatDateTick(range, date)).toEqual(expected);
    });
  });

  describe('handles formatPrice', () => {
    const cases = [
      [0, ''],
      [1, '1.00'],
      [4.5, '4.50']
    ];

    test.each(cases)('formats price of %p', (amount, expected) => {
      expect(helpers.formatPrice(amount)).toEqual(expected);
    });
  });

  describe('handles formatTimestamp', () => {
    const cases = [
      [null, null],
      [mockTime / 1000, 'less than a minute ago']
    ];

    test.each(cases)('formats timestamp of %d', (datetime, expected) => {
      expect(helpers.formatTimestamp(datetime)).toEqual(expected);
    });
  });

  describe('handles getPercentage', () => {
    const cases = [
      [null, null, null],
      [100, 90, '+10.00%'],
      [90, 100, '-11.11%']
    ];

    test.each(cases)(
      'formats percentage of %d',
      (price, prevPrice, expected) => {
        expect(helpers.getPercentage(price, prevPrice)).toEqual(expected);
      }
    );
  });

  describe('handles getDates', () => {
    const cases = [
      [
        '1D',
        [
          new Date('2019-09-30T15:11:00.000Z'),
          new Date('2019-10-01T15:11:00.000Z')
        ]
      ],
      [
        '1W',
        [
          new Date('2019-09-24T15:11:00.000Z'),
          new Date('2019-10-01T15:11:00.000Z')
        ]
      ],
      [
        '1M',
        [
          new Date('2019-09-01T15:11:00.000Z'),
          new Date('2019-10-01T15:11:00.000Z')
        ]
      ],
      [
        '3M',
        [
          new Date('2019-07-01T15:11:00.000Z'),
          new Date('2019-10-01T15:11:00.000Z')
        ]
      ],
      [
        '6M',
        [
          new Date('2019-04-01T15:11:00.000Z'),
          new Date('2019-10-01T15:11:00.000Z')
        ]
      ],
      ['??', []]
    ];

    test.each(cases)('gets dates with %p', (range, expected) => {
      expect(helpers.getDates(range, mockDate)).toEqual(expected);
    });
  });

  describe('handles getUnixDates', () => {
    it('gets dates with UNIX timestamp', () => {
      expect(helpers.getUnixDates('1D', mockDate)).toEqual([
        1511931600,
        1511931600
      ]);
    });
  });

  describe('handles getResolution', () => {
    const cases = [
      ['1D', 1],
      ['1W', 5],
      ['1M', 30],
      ['3M', 30],
      ['6M', 30],
      ['??', 1]
    ];

    test.each(cases)('gets resolution with %p', (range, expected) => {
      expect(helpers.getResolution(range)).toEqual(expected);
    });
  });

  describe('handles isExpired', () => {
    it('gets isExpired', () => {
      global.Date = originalDate;
      const date = new Date('2019-09-27');

      expect(helpers.isExpired(date, mockDate)).toEqual(false);
    });

    it('gets isExpired when false', () => {
      expect(helpers.isExpired(mockDate, mockDate)).toEqual(false);
    });
  });

  describe('handles updateChartData', () => {
    const response = {
      c: [310, 315, 321],
      h: [310, 315, 321],
      l: [310, 315, 321],
      o: [310, 315, 321],
      s: 'ok',
      t: [1581498000, 1581499440, 1581499500],
      v: [1011, 850, 377]
    };

    it('gets updateChartData for 1D', () => {
      expect(helpers.updateChartData(response, '1D')).toEqual({
        data: [
          {
            close: 310,
            date: new Date('2020-02-12T09:00:00.000Z'),
            timestamp: 1581498000
          },
          {
            close: 315,
            date: new Date('2020-02-12T09:24:00.000Z'),
            timestamp: 1581499440
          },
          {
            close: 321,
            date: new Date('2020-02-12T09:25:00.000Z'),
            timestamp: 1581499500
          }
        ],
        start: 310,
        startDate: new Date('2020-02-12T09:00:00.000Z'),
        end: 321,
        endDate: new Date('2020-02-12T09:25:00.000Z'),
        range: '1D'
      });
    });
  });

  describe('handles rehydrateChartData', () => {
    const response = {
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
          }
        ],
        start: 318,
        startDate: '2020-02-10T09:00:00.000Z',
        end: 320.9,
        endDate: '2020-02-11T00:59:00.000Z',
        range: '1D'
      }
    };

    it('gets rehydrateChartData', () => {
      const chartData = response.chartData;

      expect(helpers.rehydrateChartData(response)).toEqual({
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
      });
    });
  });
});
