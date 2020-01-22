export const initialStocks = [
  { symbol: 'AAPL', displaySymbol: 'AAPL', description: 'APPLE INC' },
  { symbol: 'AMZN', displaySymbol: 'AMZN', description: 'AMAZON.COM INC' },
  { symbol: 'FB', displaySymbol: 'FB', description: 'FACEBOOK INC-CLASS A' },
  { symbol: 'GOOG', displaySymbol: 'GOOG', description: 'ALPHABET INC-CL C' },
  { symbol: 'MSFT', displaySymbol: 'MSFT', description: 'MICROSOFT CORP' }
];

export const API_CANDLESTICK = 'https://finnhub.io/api/v1/stock/candle';

export const API_NEWS = 'https://finnhub.io/api/v1/news';

export const API_QUOTE = 'https://finnhub.io/api/v1/quote';

export const API_TOKEN = 'bojsah7rh5rcji5m4udg';

export const API_EXCHANGE = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_TOKEN}`;
