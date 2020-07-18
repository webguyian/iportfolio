import { useEffect, useState } from 'react';

import {
  useFetch,
  useFetchWithData,
  useStorageCache
} from 'modules/browser/hooks';
import {
  API_CANDLESTICK,
  API_EXCHANGE,
  API_QUOTE
} from 'modules/stocks/constants';
import {
  getCandlestickEndpoint,
  getResolution,
  getStockEndpoint,
  getStockNewsEndpoint,
  getUnixDates,
  isExpired,
  isExpiredNews,
  updateChartData,
  rehydrateChartData
} from 'modules/stocks/helpers';

export const useSearch = () => {
  const [value, setValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const hasSearch = Boolean(searchFocus || searchTerm.length);

  const handleCancel = () => {
    setValue('');
    setSearchTerm('');
    setSearchFocus(false);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleFocus = () => {
    setSearchFocus(focus => !focus);
  };

  const searchHandlers = {
    onBlur: handleFocus,
    onCancel: handleCancel,
    onChange: handleChange,
    onFocus: handleFocus,
    value
  };

  useEffect(() => {
    if (value) {
      setSearchTerm(value.toUpperCase().trim());
    } else {
      setSearchTerm('');
    }
  }, [value]);

  return [searchTerm, searchHandlers, hasSearch];
};

export const useStockSearch = (allStocks, searchTerm) => {
  const [filteredStocks, setFilteredStocks] = useState(allStocks);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allStocks.filter(stock => {
        return (
          stock.symbol.indexOf(searchTerm) === 0 ||
          stock.description.indexOf(searchTerm) === 0
        );
      });

      setFilteredStocks(filtered);
    } else if (!searchTerm) {
      setFilteredStocks(allStocks);
    }
  }, [searchTerm]);

  return filteredStocks;
};

export const useStockExchange = () => {
  const [allStocks, setAllStocks] = useState([]);
  const exchangeResponse = useFetch(API_EXCHANGE);

  useEffect(() => {
    if (!exchangeResponse) {
      // Exit early if no response
      return;
    }

    setAllStocks(exchangeResponse);
  }, [exchangeResponse]);

  return allStocks;
};

export const useStocks = initialStocks => {
  const [stocks, setStocks] = useState([]);
  const [activeStocks, setActiveStocks] = useState([]);
  const [data, setData] = useState();
  const response = useFetchWithData(API_QUOTE, data);
  const cache = useStorageCache(
    'stocks',
    { stocks },
    stockData => !stockData.stocks.length
  );

  useEffect(() => {
    const cachedStocks = cache && cache.stocks;

    if (cachedStocks && cachedStocks.length) {
      setStocks(cachedStocks);
      setActiveStocks(cachedStocks);
    } else {
      setStocks(initialStocks);
      setActiveStocks(initialStocks);
    }
  }, []);

  useEffect(() => {
    if (activeStocks.length) {
      const symbols = activeStocks.map(s => s.symbol);

      setData({ symbols });
    }
  }, [activeStocks]);

  useEffect(() => {
    if (!response || !activeStocks.length) {
      return;
    }

    const updatedStocks = activeStocks.map(stock => {
      const result = response[stock.symbol] || {};

      return {
        ...stock,
        ...result,
        price: result.c,
        previousPrice: result.pc
      };
    });

    setStocks(updatedStocks);
  }, [response, activeStocks]);

  return [stocks, setStocks];
};

export const useStockDetail = () => {
  const [endpoint, setEndpoint] = useState('');
  const [activeStock, setActiveStock] = useState(null);
  const [stock, setStockDetail] = useState(activeStock);
  const response = useFetch(endpoint);

  useEffect(() => {
    setStockDetail(activeStock);

    if (!activeStock) {
      return;
    }

    if (!activeStock.price) {
      setEndpoint(getStockEndpoint(activeStock));
    }
  }, [activeStock]);

  useEffect(() => {
    if (response) {
      setStockDetail({
        ...activeStock,
        ...response,
        price: response.c,
        previousPrice: response.pc
      });
      setEndpoint('');
    }
  }, [response]);

  return [stock, setActiveStock];
};

export const useStockNews = category => {
  const [endpoint, setEndpoint] = useState('');
  const [news, setNews] = useState([]);
  const response = useFetch(endpoint);
  const cache = useStorageCache(
    'stock-news',
    { news: response },
    res => !res.news.length
  );

  useEffect(() => {
    const cachedNews = cache && cache.news;

    if (cachedNews && cachedNews.length) {
      setNews(cachedNews);
      const expired = isExpiredNews(cachedNews[0].datetime);

      if (!expired && !category) {
        // Exit early when cache is not expired and no category
        return;
      }
    }

    setEndpoint(getStockNewsEndpoint(category));
  }, [category]);

  useEffect(() => {
    if (response && response.length) {
      setNews(response);
    }
  }, [response]);

  return news;
};

export const useStockChart = (symbol, range, chartData) => {
  const [endpoint, setEndpoint] = useState();
  const [updatedResponse, setResponse] = useState(null);
  const response = useFetch(endpoint);

  useEffect(() => {
    if (chartData) {
      // Exit early when chartData is presetn
      return;
    }

    const updatedEndpoint = getCandlestickEndpoint(symbol, range);

    setEndpoint(updatedEndpoint);
  }, [symbol, range, chartData]);

  useEffect(() => {
    if (response && response.s === 'ok') {
      const data = updateChartData(response, range);

      setResponse(data);
    }
  }, [response]);

  return chartData || updatedResponse;
};

export const useStockTicker = (stocks, range = '1D') => {
  const [data, setData] = useState();
  const [charts, setCharts] = useState([]);
  const candlestickData = useFetchWithData(API_CANDLESTICK, data);
  const cache = useStorageCache(
    'stock-charts',
    { charts },
    res => !res.charts.length
  );

  useEffect(() => {
    const cachedCharts = cache && cache.charts;

    if (cachedCharts && cachedCharts.length) {
      const updated = cachedCharts.map(rehydrateChartData);
      const [head] = updated;
      const expired = isExpired(head.chartData.endDate);

      setCharts(updated);

      if (!expired) {
        // Exit early when cache is not expired
        return;
      }
    }

    if (!stocks || !stocks.length) {
      return;
    }

    const symbols = stocks.map(stock => stock.symbol);
    const [from, to] = getUnixDates(range);
    const resolution = getResolution(range);
    const requestData = {
      symbols,
      resolution,
      from,
      to
    };

    // Trigger fetch for candlestick data
    setData(requestData);
  }, [stocks.length]);

  useEffect(() => {
    if (!candlestickData) {
      return;
    }

    const updated = stocks.map(stock => {
      const result = candlestickData[stock.symbol] || {};

      if (result.s !== 'ok') {
        return null;
      }

      const chartData = updateChartData(result, range);

      return {
        ...stock,
        chartData
      };
    });

    if (updated[0] !== null) {
      setCharts(updated);
    }
  }, [candlestickData]);

  return charts;
};
