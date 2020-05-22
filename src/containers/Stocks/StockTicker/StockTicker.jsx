import React from 'react';
import PropTypes from 'prop-types';

import { useStockTicker } from 'modules/stocks/hooks';
import Stock from 'containers/Stocks/StockTicker/Stock';

const StockTicker = props => {
  const { onClick, stocks } = props;
  const stockData = useStockTicker(stocks);
  const baseClass = 'stock-ticker';

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
