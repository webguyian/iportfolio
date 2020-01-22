import React from 'react';
import PropTypes from 'prop-types';

import { useStockTicker } from 'containers/Stocks/hooks';
import Stock from 'containers/Stocks/StockTicker/Stock';

const StockTicker = props => {
  const { onClick, stocks } = props;
  const baseClass = 'stock-ticker';

  if (!stocks || !stocks.length) {
    return null;
  }

  const stockData = useStockTicker(stocks);

  if (!stockData || !stockData.length) {
    return null;
  }

  return (
    <div className={baseClass}>
      <ul className={`${baseClass}-list`}>
        {stockData.map(stock => (
          <Stock
            key={stock.displaySymbol}
            onClick={onClick.bind(null, stock)}
            stock={stock}
          />
        ))}
      </ul>
    </div>
  );
};

StockTicker.propTypes = {
  onClick: PropTypes.func.isRequired,
  stocks: PropTypes.array
};

export default StockTicker;
