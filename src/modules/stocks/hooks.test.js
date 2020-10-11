import React from 'react';
import { act } from 'react-test-renderer';

import { TestComponent, createMockResponse, testHook } from 'utilities/test';

import { MOCK_TOKEN } from 'modules/browser/constants';
import * as browserHooks from 'modules/browser/hooks';
import { initialStocks } from './constants';
import * as helpers from './helpers';
import * as hooks from './hooks';

describe('Stocks hooks', () => {
  const useStorageCacheHook = browserHooks.useStorageCache;
  const isExpired = helpers.isExpired;
  const isExpiredNews = helpers.isExpiredNews;

  browserHooks.useStorageCache = jest.fn();
  helpers.isExpired = jest.fn();
  helpers.isExpiredNews = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    browserHooks.useStorageCache.mockImplementation(useStorageCacheHook);
    helpers.isExpired.mockImplementation(isExpired);
    helpers.isExpiredNews.mockImplementation(isExpiredNews);
  });

  describe('useSearch', () => {
    it('returns search values', () => {
      let response;

      testHook(() => {
        response = hooks.useSearch();
      });

      expect(response).toEqual([
        '',
        {
          onBlur: expect.any(Function),
          onCancel: expect.any(Function),
          onChange: expect.any(Function),
          onFocus: expect.any(Function),
          value: ''
        },
        false
      ]);
    });

    it('handles change', () => {
      const mockEvent = {
        target: {
          value: 'aa'
        }
      };

      let searchTerm, searchHandlers;

      testHook(() => {
        [searchTerm, searchHandlers] = hooks.useSearch();
      });

      expect(searchTerm).toEqual('');

      act(() => {
        searchHandlers.onChange(mockEvent);
      });

      expect(searchTerm).toEqual('AA');
    });

    it('handles focus', () => {
      let hasSearch, searchHandlers;

      testHook(() => {
        [, searchHandlers, hasSearch] = hooks.useSearch();
      });

      expect(hasSearch).toBe(false);

      act(() => {
        searchHandlers.onFocus();
      });

      expect(hasSearch).toBe(true);
    });

    it('handles cancel', () => {
      const mockEvent = {
        target: {
          value: 'aa'
        }
      };

      let hasSearch, searchTerm, searchHandlers;

      testHook(() => {
        [searchTerm, searchHandlers, hasSearch] = hooks.useSearch();
      });

      act(() => {
        searchHandlers.onChange(mockEvent);
      });

      expect(searchTerm).toEqual('AA');
      expect(hasSearch).toBe(true);

      act(() => {
        searchHandlers.onCancel();
      });

      expect(searchTerm).toEqual('');
      expect(hasSearch).toBe(false);
    });
  });

  describe('useStockSearch', () => {
    it('returns stocks', () => {
      let response;

      testHook(() => {
        response = hooks.useStockSearch(initialStocks, '');
      });

      expect(response).toEqual(initialStocks);
    });

    it('returns all stocks without search', () => {
      let response;
      const Component = testHook(() => {
        response = hooks.useStockSearch(initialStocks, 'AA');
      });

      act(() => {
        const callback = () => {
          response = hooks.useStockSearch(initialStocks, '');
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(initialStocks);
    });

    it('returns all stocks with single letter search', () => {
      let response;
      const Component = testHook(() => {
        response = hooks.useStockSearch(initialStocks, '');
      });

      act(() => {
        const callback = () => {
          response = hooks.useStockSearch(initialStocks, 'A');
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(initialStocks);
    });

    it('returns filtered stocks', () => {
      let response;
      const Component = testHook(() => {
        response = hooks.useStockSearch(initialStocks, 'AA');
      });

      act(() => {
        const callback = () => {
          response = hooks.useStockSearch(initialStocks, 'AA');
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(
        initialStocks.filter(stock => stock.symbol.startsWith('AA'))
      );
    });
  });

  describe('useStocks', () => {
    const response = {
      AAPL: {
        c: 317.94,
        h: 321.15,
        l: 316.47,
        o: 319.25,
        pc: 318.25,
        t: 1590887588
      },
      AMZN: {
        c: 2442.37,
        h: 2442.37,
        l: 2398.1973,
        o: 2415.94,
        pc: 2401.1,
        t: 1590887588
      },
      FB: {
        c: 225.09,
        h: 227.49,
        l: 222.88,
        o: 225.2,
        pc: 225.46,
        t: 1590887588
      },
      GOOG: {
        c: 1428.92,
        h: 1432.57,
        l: 1413.35,
        o: 1416.94,
        pc: 1416.73,
        t: 1590887588
      },
      MSFT: {
        c: 183.25,
        h: 184.27,
        l: 180.41,
        o: 182.73,
        pc: 181.4,
        t: 1590887588
      }
    };

    it('returns useStocks response', async () => {
      const mockToken = createMockResponse(MOCK_TOKEN);
      const stockResponse = createMockResponse(response);

      let stocks;

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(stockResponse);

      const Component = testHook(() => {
        [stocks] = hooks.useStocks(initialStocks);
      });

      await act(async () => {
        const callback = () => {
          [stocks] = hooks.useStocks(initialStocks);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(stocks).toEqual(
        initialStocks.map(stock => {
          const result = response[stock.symbol] || {};

          return {
            ...stock,
            ...result,
            price: result.c,
            previousPrice: result.pc
          };
        })
      );
    });

    it('returns useStocks from cache', async () => {
      const mockToken = createMockResponse(MOCK_TOKEN);
      const stockResponse = createMockResponse(response);

      let stocks;

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(stockResponse);
      browserHooks.useStorageCache.mockReturnValue({
        stocks: initialStocks.slice(0, 2)
      });

      const Component = testHook(() => {
        [stocks] = hooks.useStocks(initialStocks);
      });

      await act(async () => {
        const callback = () => {
          [stocks] = hooks.useStocks(initialStocks);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(stocks).toEqual(
        initialStocks.slice(0, 2).map(stock => {
          const result = response[stock.symbol] || {};

          return {
            ...stock,
            ...result,
            price: result.c,
            previousPrice: result.pc
          };
        })
      );
    });
  });

  describe('useStockDetail', () => {
    it('returns null stock detail', async () => {
      let stock;

      const mockToken = createMockResponse(MOCK_TOKEN);

      global.fetch.mockReturnValueOnce(mockToken);

      testHook(() => {
        [stock] = hooks.useStockDetail();
      });

      expect(stock).toEqual(null);
    });

    it('returns stock detail', async () => {
      let stock, setActiveStock;
      const stockData = {
        ...initialStocks[0],
        c: 100,
        pc: 90
      };

      const response = createMockResponse(stockData);

      const Component = testHook(() => {
        [stock, setActiveStock] = hooks.useStockDetail();
      });

      global.fetch.mockReturnValueOnce(response);

      await act(async () => {
        const callback = () => {
          [stock] = hooks.useStockDetail();
        };

        setActiveStock(initialStocks[0]);

        Component.update(<TestComponent callback={callback} />);
      });

      expect(stock).toEqual({
        ...stockData,
        price: stockData.c,
        previousPrice: stockData.pc
      });
    });

    it('returns stock detail without call', async () => {
      let stock, setActiveStock;
      const stockData = {
        ...initialStocks[0],
        price: 100,
        previousPrice: 90
      };

      const Component = testHook(() => {
        [stock, setActiveStock] = hooks.useStockDetail();
      });

      await act(async () => {
        const callback = () => {
          [stock] = hooks.useStockDetail();
        };

        setActiveStock(stockData);

        Component.update(<TestComponent callback={callback} />);
      });

      expect(stock).toEqual(stockData);
    });
  });

  describe('useStockNews', () => {
    const generalNews = [
      {
        category: 'company news',
        datetime: 1581784310,
        headline:
          'Hacker Makes $360,000 ETH From a Flash Loan Single Transaction Involving Fulcrum, Compound, DyDx and Uniswap',
        id: 963732,
        image:
          'https://cryptonewsmonitor.com/wp-content/uploads/2017/09/trustnodesfeature.png',
        related: ',ETH,',
        source: 'Crypto News Monitor',
        summary:
          'This article was originally posted on Trustnodes - a trusted site covering numerous topics related to cryptocurrency and a great selection of news and editorial […]',
        url:
          'https://cryptonewsmonitor.com/2020/02/15/hacker-makes-360000-eth-from-a-flash-loan-single-transaction-involving-fulcrum-compound-dydx-and-uniswap/'
      },
      {
        category: 'company news',
        datetime: 1581784249,
        headline: 'Storm Dennis causes UK chaos for 50,000 airline passengers',
        id: 963694,
        image:
          'https://i.dailymail.co.uk/1s/2020/02/15/16/24779392-0-image-a-61_1581785727395.jpg',
        related: ',BAB,',
        source: 'Daily Mail Online',
        summary:
          'No fewer than 40,000 passengers have been affected by travel disruption so far as budget airline easyJet cancels 234 flights. British Airways has cancelled around 20 to 30 flights due to the storm.',
        url:
          'https://www.dailymail.co.uk/news/article-8007601/Storm-Dennis-causes-UK-chaos-50-000-airline-passengers.html'
      },
      {
        category: 'company news',
        datetime: 1581777780,
        headline:
          'Activision Blizzard\'s games were pulled from GeForce Now due to a "misunderstanding," Nvidia says',
        id: 963466,
        image:
          'https://static.techspot.com/images2/news/ts3_thumbs/2019/03/2019-03-04-ts3_thumbs-0e3.jpg',
        related: ',ATVI,',
        source: 'TechSpot',
        summary:
          'Apparently, Activision Blizzard\'s games were allowed to be on GeForce Now -- but only during the Beta. When the service "graduated" to its 90-day free trial period for founders, Nvidia assumed that its agreement with Activision Blizzard would still hold.…',
        url:
          'https://www.techspot.com/news/84031-activision-blizzard-games-pulled-geforce-now-due-misunderstanding.html'
      },
      {
        category: 'company news',
        datetime: 1581775257,
        headline: 'FTC Stops Deceptive Advertising Sales to Small Businesses',
        id: 963530,
        image:
          'https://smallbiztrends.com/wp-content/uploads/2020/02/Deceptive-Advertising-Sales.jpg',
        related: ',FTI,FTC,',
        source: 'Small Business Trends',
        summary:
          'The FTC recently punished a company for using deceptive advertising to dupe some small businesses on the exclusivity of what they were buying.',
        url:
          'https://smallbiztrends.com/2020/02/deceptive-advertising-case.html'
      }
    ];

    it('returns empty stock news', () => {
      let news;
      const mockToken = createMockResponse(MOCK_TOKEN);
      const mockResponse = createMockResponse([]);

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(mockResponse);

      testHook(() => {
        [news] = hooks.useStockNews();
      });

      expect(news).toEqual([]);
    });

    it('returns general stock news', async () => {
      let news;
      const Component = testHook(() => {
        [news] = hooks.useStockNews();
      });

      const mockToken = createMockResponse(MOCK_TOKEN);
      const response = createMockResponse(generalNews);

      global.fetch.mockReturnValueOnce(mockToken).mockReturnValueOnce(response);

      await act(async () => {
        const callback = () => {
          [news] = hooks.useStockNews();
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(news).toEqual(generalNews);
    });

    it('returns company stock news', async () => {
      let news;
      const Component = testHook(() => {
        [news] = hooks.useStockNews('AAPL');
      });
      const newsData = [
        {
          category: 'company news',
          datetime: 1581775217,
          headline:
            'Top Stories: 5G iPhone and iPad Rumors, AirPods Pro Lite?, HomePod Turns Two',
          id: 963317,
          image:
            'https://images.macrumors.com/article-new/2020/02/top_stories_15feb2020_thumb.jpg',
          related: 'AAPL',
          source: 'Mac Rumors',
          summary:
            'It was a fairly interesting week for rumors this week, with reports claiming new 5G iPad models will be coming around the same time as 5G iPhones, likely in the September–October timeframe, while a mysterious "AirPod Pro Lite" has been mentioned as being in the works. Subscribe to the MacRumors YouTube channel for more videos. The HomePod turned two years old this week, and Apple is still dealing with the fallout of the Wuhan coronavirus epidemic, which aside from the human toll has impacted both Apple\'s retail sales and product manufacturing. Read on for details on these stories and more that topped the news this week. 5G iPad Pro Models With A14 Series Chip Said to Launch in Fall 2020 A report this week claims that Apple plans to release its first iPhone and iPad models with 5G connectivity in the second half of 2020 . An announcement in September or October is possible. The new iPhone and iPad models are expected to be equipped with 5nm-based A14 chips — likely A14X for the iPad Pro — and support a combination of mmWave and sub-6GHz variants of 5G.',
          url:
            'https://www.macrumors.com/2020/02/15/top-stories-5g-iphone-ipad-airpods-pro-lite/'
        },
        {
          category: 'company news',
          datetime: 1581771613,
          headline:
            'The iPhone 9 (SE 2) is real, according to case-makers - CNET',
          id: 963318,
          image:
            'https://cnet4.cbsistatic.com/img/fhJsjiFMxUKxMWLv_vrTCs1VHII=/756x567/2018/06/01/06841bbb-e0c6-4404-9252-6a98b2a8a2f5/iphone-8-34.jpg',
          related: 'AAPL',
          source: 'CNET',
          summary:
            "iPhone SE 2 cases have started popping up online in anticipation of Apple's rumored March event, where the company is expected to announce the sequel to the cheaper iPhone SE.",
          url:
            'https://www.cnet.com/news/iphone-9-se-2-is-real-according-to-case-makers/'
        },
        {
          category: 'company news',
          datetime: 1581771601,
          headline:
            "Apple's $5K Pro Display XDR is a good deal for the right person video - CNET",
          id: 963319,
          image:
            'https://cnet4.cbsistatic.com/img/odS02MwPRkRY_H4-vd3fjLeTUZs=/2020/02/12/e06f32cf-f29a-4db5-adab-7b193c0aadc4/lori-work1.png',
          related: 'AAPL',
          source: 'CNET',
          summary:
            "Many people were shocked -- shocked! -- by the $5,000-plus price tag Apple gave its Pro Display XDR monitor (not to mention that $1,000 stand). But given that the monitor is targeted at professionals who are used to paying through the nose for their gear, the price really isn't so shocking. CNET's Lori Grunin has been testing the Pro Display XDR for a few days and tried to find out exactly who it's for.",
          url:
            'https://www.cnet.com/videos/apples-pro-display-xdr-is-a-good-deal/'
        }
      ];

      const mockToken = createMockResponse(MOCK_TOKEN);
      const response = createMockResponse(newsData);

      global.fetch.mockReturnValueOnce(mockToken).mockReturnValueOnce(response);

      await act(async () => {
        const callback = () => {
          [news] = hooks.useStockNews('AAPL');
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(news).toEqual(newsData);
    });

    it('returns news from cache', async () => {
      let news;

      browserHooks.useStorageCache.mockReturnValue({
        news: generalNews.slice(0, 2)
      });
      helpers.isExpiredNews.mockReturnValue(false);
      const Component = testHook(() => {
        [news] = hooks.useStockNews();
      });

      await act(async () => {
        const callback = () => {
          [news] = hooks.useStockNews();
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(news).toEqual(generalNews.slice(0, 2));
    });

    it('returns news not from cache when expired', async () => {
      let news;

      browserHooks.useStorageCache.mockReturnValue({
        news: generalNews.slice(0, 2)
      });
      helpers.isExpiredNews.mockReturnValue(true);
      const mockToken = createMockResponse(MOCK_TOKEN);
      const response = createMockResponse(generalNews);

      global.fetch.mockReturnValueOnce(mockToken).mockReturnValueOnce(response);
      const Component = testHook(() => {
        [news] = hooks.useStockNews();
      });

      await act(async () => {
        const callback = () => {
          [news] = hooks.useStockNews();
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(news).toEqual(generalNews);
    });
  });

  describe('useStockChart', () => {
    it('returns null chart data', async () => {
      let response;
      const mockToken = createMockResponse(MOCK_TOKEN);
      const chartResponse = createMockResponse({});

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(chartResponse);

      const Component = testHook(() => {
        response = hooks.useStockChart('AAPL', '1D');
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useStockChart('AAPL', '1D');
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(null);
    });

    it('returns chart data', async () => {
      let response;
      const stockData = {
        c: [325, 325.3, 325.3423],
        h: [325.29, 325.43, 325.55],
        l: [324.8101, 324.975, 325.1],
        o: [325.27, 325, 325.39],
        s: 'ok',
        t: [1581604740, 1581604800, 1581604860],
        v: [121991, 118024, 144862]
      };

      const mockToken = createMockResponse(MOCK_TOKEN);
      const chartResponse = createMockResponse(stockData);

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(chartResponse);

      const Component = testHook(() => {
        response = hooks.useStockChart('AAPL', '1D');
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useStockChart('AAPL', '1D');
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(helpers.updateChartData(stockData, '1D'));
    });
  });

  describe('useStockTicker', () => {
    it('returns empty ticker data', async () => {
      const stocks = initialStocks.slice(0, 2);

      let response;
      const mockToken = createMockResponse(MOCK_TOKEN);
      const tickerResponse = createMockResponse({});

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(tickerResponse);

      const Component = testHook(() => {
        response = hooks.useStockTicker(stocks);
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useStockTicker(stocks);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual([]);
    });

    it('returns ticker data', async () => {
      const stocks = initialStocks.slice(0, 2);

      let response;
      const mockToken = createMockResponse(MOCK_TOKEN);
      const appleChartData = {
        c: [325, 325.3, 325.3423],
        h: [325.29, 325.43, 325.55],
        l: [324.8101, 324.975, 325.1],
        o: [325.27, 325, 325.39],
        s: 'ok',
        t: [1581604740, 1581604800, 1581604860],
        v: [121991, 118024, 144862]
      };
      const amazonChartData = {
        c: [2152.7803, 2151.6, 2150.497],
        h: [2153.49, 2152.6942, 2151.2105],
        l: [2151.61, 2150.6597, 2148.5],
        o: [2151.61, 2152.53, 2151.16],
        s: 'ok',
        t: [1581605220, 1581605280, 1581605340],
        v: [16312, 9738, 14310]
      };
      const chartData = {
        AAPL: appleChartData,
        AMZN: amazonChartData
      };

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(createMockResponse(chartData));

      const Component = testHook(() => {
        response = hooks.useStockTicker(stocks);
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useStockTicker(stocks);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      const appleResponse = {
        ...initialStocks[0],
        chartData: helpers.updateChartData(appleChartData, '1D')
      };
      const amazonResponse = {
        ...initialStocks[1],
        chartData: helpers.updateChartData(amazonChartData, '1D')
      };

      expect(response).toEqual([appleResponse, amazonResponse]);
    });

    it('returns ticker data from cache', async () => {
      const stocks = initialStocks.slice(0, 2);

      let response;
      const appleChartData = {
        c: [325, 325.3, 325.3423],
        h: [325.29, 325.43, 325.55],
        l: [324.8101, 324.975, 325.1],
        o: [325.27, 325, 325.39],
        s: 'ok',
        t: [1581604740, 1581604800, 1581604860],
        v: [121991, 118024, 144862]
      };
      const amazonChartData = {
        c: [2152.7803, 2151.6, 2150.497],
        h: [2153.49, 2152.6942, 2151.2105],
        l: [2151.61, 2150.6597, 2148.5],
        o: [2151.61, 2152.53, 2151.16],
        s: 'ok',
        t: [1581605220, 1581605280, 1581605340],
        v: [16312, 9738, 14310]
      };

      const appleResponse = {
        ...initialStocks[0],
        chartData: helpers.updateChartData(appleChartData, '1D')
      };
      const amazonResponse = {
        ...initialStocks[1],
        chartData: helpers.updateChartData(amazonChartData, '1D')
      };

      browserHooks.useStorageCache.mockReturnValue({
        charts: [appleResponse, amazonResponse]
      });
      helpers.isExpired.mockReturnValue(false);

      const Component = testHook(() => {
        response = hooks.useStockTicker(stocks);
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useStockTicker(stocks);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual([appleResponse, amazonResponse]);
    });

    it('returns ticker data not from cache when expired', async () => {
      const stocks = initialStocks.slice(0, 2);

      let response;
      const mockToken = createMockResponse(MOCK_TOKEN);
      const appleChartData = {
        c: [325, 325.3, 325.3423],
        h: [325.29, 325.43, 325.55],
        l: [324.8101, 324.975, 325.1],
        o: [325.27, 325, 325.39],
        s: 'ok',
        t: [1581604740, 1581604800, 1581604860],
        v: [121991, 118024, 144862]
      };
      const amazonChartData = {
        c: [2152.7803, 2151.6, 2150.497],
        h: [2153.49, 2152.6942, 2151.2105],
        l: [2151.61, 2150.6597, 2148.5],
        o: [2151.61, 2152.53, 2151.16],
        s: 'ok',
        t: [1581605220, 1581605280, 1581605340],
        v: [16312, 9738, 14310]
      };

      const appleResponse = {
        ...initialStocks[0],
        chartData: helpers.updateChartData(appleChartData, '1D')
      };
      const amazonResponse = {
        ...initialStocks[1],
        chartData: helpers.updateChartData(amazonChartData, '1D')
      };
      const chartData = {
        AAPL: appleChartData,
        AMZN: amazonChartData
      };

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(createMockResponse(chartData));

      browserHooks.useStorageCache.mockReturnValue({
        charts: [appleResponse]
      });
      helpers.isExpired.mockReturnValue(true);

      const Component = testHook(() => {
        response = hooks.useStockTicker(stocks);
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useStockTicker(stocks);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual([appleResponse, amazonResponse]);
    });
  });
});
