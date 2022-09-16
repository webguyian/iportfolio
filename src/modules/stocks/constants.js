export const initialStocks = [
  { symbol: 'AAPL', displaySymbol: 'AAPL', description: 'APPLE INC' },
  { symbol: 'AMZN', displaySymbol: 'AMZN', description: 'AMAZON.COM INC' },
  { symbol: 'GOOG', displaySymbol: 'GOOG', description: 'ALPHABET INC-CL C' },
  { symbol: 'MSFT', displaySymbol: 'MSFT', description: 'MICROSOFT CORP' },
  {
    symbol: 'META',
    displaySymbol: 'META',
    description: 'META PLATFORMS INC-CLASS A'
  }
];

export const API_CANDLESTICK = `${process.env.API_PREFIX}/api/stocks/candlestick`;

export const API_EXCHANGE = `${process.env.API_PREFIX}/api/stocks/exchange`;

export const API_NEWS = `${process.env.API_PREFIX}/api/stocks/news`;

export const API_QUOTE = `${process.env.API_PREFIX}/api/stocks/quote`;
