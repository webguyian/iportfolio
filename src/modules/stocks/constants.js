export const initialStocks = [
  { symbol: 'AAPL', displaySymbol: 'AAPL', description: 'APPLE INC' },
  { symbol: 'AMZN', displaySymbol: 'AMZN', description: 'AMAZON.COM INC' },
  { symbol: 'FB', displaySymbol: 'FB', description: 'FACEBOOK INC-CLASS A' },
  { symbol: 'GOOG', displaySymbol: 'GOOG', description: 'ALPHABET INC-CL C' },
  { symbol: 'MSFT', displaySymbol: 'MSFT', description: 'MICROSOFT CORP' }
];

export const API_CANDLESTICK =
  'https://api-iportfolio.herokuapp.com/api/stocks/candlestick';

export const API_EXCHANGE =
  'https://api-iportfolio.herokuapp.com/api/stocks/exchange';

export const API_NEWS = 'https://api-iportfolio.herokuapp.com/api/stocks/news';

export const API_QUOTE =
  'https://api-iportfolio.herokuapp.com/api/stocks/quote';
