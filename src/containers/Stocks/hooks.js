import { useEffect, useState } from 'react';

import { useStorageCache } from 'hooks';
import { API_EXCHANGE, API_TOKEN } from 'containers/Stocks/constants';
import {
  getCandlestickEndpoint,
  getCandlestickEndpoints,
  getStockEndpoint,
  getStockNewsEndpoint,
  isExpired,
  isExpiredNews,
  updateChartData,
  rehydrateChartData
} from 'containers/Stocks/helpers';

export const useFetch = endpoint => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await fetch(endpoint);
    const result = await response.json();

    setData(result);
  };

  useEffect(() => {
    if (!endpoint) {
      return;
    }

    fetchData();
  }, [endpoint]);

  return data;
};

export const useFetchAll = urls => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        urls.map(async url => {
          const response = await fetch(url);

          return response.json();
        })
      );

      setResponses(results);
    };

    if (urls.length) {
      fetchData();
    }
  }, [urls]);

  return responses;
};

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

export const useStocks = initialStocks => {
  const [endpoints, setEndpoints] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [activeStocks, setActiveStocks] = useState([]);
  const exchangeResponse = useFetch(API_EXCHANGE);
  const response = useFetchAll(endpoints);
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
    if (!exchangeResponse) {
      // Exit early if no response
      return;
    }

    const symbols = activeStocks.map(stock => stock.symbol);
    const currentStocks = exchangeResponse.filter(stock =>
      symbols.includes(stock.symbol)
    );

    setEndpoints(currentStocks.map(getStockEndpoint));
    setAllStocks(exchangeResponse);
  }, [exchangeResponse]);

  useEffect(() => {
    if (activeStocks.length) {
      setEndpoints(activeStocks.map(getStockEndpoint));
    }
  }, [activeStocks]);

  useEffect(() => {
    if (!response.length || !activeStocks.length) {
      return;
    }

    const updatedStocks = response.map((result, index) => {
      const stock = activeStocks[index];

      return {
        ...result,
        ...stock,
        price: result.c,
        previousPrice: result.pc
      };
    });

    setStocks(updatedStocks);
  }, [response, activeStocks]);

  return [stocks, setStocks, allStocks];
};

export const useStockDetail = () => {
  const [endpoint, setEndpoint] = useState('');
  const [activeStock, setActiveStock] = useState(null);
  const [stock, setStockDetail] = useState(activeStock);
  const response = useFetch(endpoint);
  const getStock = symbol =>
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_TOKEN}`;

  useEffect(() => {
    setStockDetail(activeStock);

    if (!activeStock) {
      return;
    }

    if (!activeStock.price) {
      setEndpoint(getStock(activeStock.symbol));
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

export const useStockChart = (symbol, range) => {
  const [endpoint, setEndpoint] = useState();
  const [updatedResponse, setResponse] = useState(null);
  const response = useFetch(endpoint);

  useEffect(() => {
    const updatedEndpoint = getCandlestickEndpoint(symbol, range);

    setEndpoint(updatedEndpoint);
  }, [symbol, range]);

  useEffect(() => {
    if (response && response.s === 'ok') {
      const data = updateChartData(response, range);

      setResponse(data);
    }
  }, [response]);

  return updatedResponse;
};

export const useStockTicker = (stocks, range = '1D') => {
  const [endpoints, setEndpoints] = useState([]);
  const [updatedResponse, setResponse] = useState([]);
  const response = useFetchAll(endpoints);
  const cache = useStorageCache(
    'stock-charts',
    { charts: updatedResponse },
    res => !res.charts.length
  );

  useEffect(() => {
    const cachedCharts = cache && cache.charts;

    if (cachedCharts && cachedCharts.length) {
      const updated = cachedCharts.map(rehydrateChartData);
      const [head] = updated;
      const expired = isExpired(head.chartData.endDate);

      setResponse(updated);

      if (!expired) {
        // Exit early when cache is not expired
        return;
      }
    }

    // Trigger fetch for candlestick data
    setEndpoints(getCandlestickEndpoints(stocks, range));
  }, [stocks.length]);

  useEffect(() => {
    if (response.length) {
      const updated = response.map((res, index) => {
        if (res.s !== 'ok') {
          return null;
        }

        const stock = stocks[index];
        const chartData = updateChartData(res, range);

        return {
          ...stock,
          chartData
        };
      });

      if (updated[0] !== null) {
        setResponse(updated);
      }
    }
  }, [response]);

  return updatedResponse;
};
