import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatPrice, getPercentage } from 'modules/stocks/helpers';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

import StockChart from 'containers/Stocks/StockChart/StockChart';
import StockNews from 'containers/Stocks/StockNews/StockNews';
import StockTicker from 'containers/Stocks/StockTicker/StockTicker';

const StockDetail = props => {
  const { onAdd, onClick, onClose, stock, stocks } = props;
  const baseClass = 'stock-detail';
  const differenceClass = `${baseClass}-difference`;

  if (!stock) {
    return null;
  }

  const stockSymbols = stocks.map(s => s.displaySymbol);
  const showAdd = !stockSymbols.includes(stock.displaySymbol);
  const modifierClass =
    stock.price > stock.previousPrice
      ? `${differenceClass}--up`
      : `${differenceClass}--down`;

  return (
    <Fragment>
      <StockTicker stocks={stocks} onClick={onClick} />
      <div className={baseClass}>
        <header className={`${baseClass}-header`}>
          <Text className={`${baseClass}-symbol`} modifier="bold">
            {stock.symbol}
          </Text>
          <Text className={`${baseClass}-description`}>
            {stock.description}
          </Text>
          <Button
            className={`${baseClass}-close-btn`}
            icon="times-circle"
            size="2x"
            onClick={onClose}
          >
            Close detail view
          </Button>
        </header>
        <div className={`${baseClass}-content`}>
          <div className={`${baseClass}-value`}>
            <Text className={`${baseClass}-price`}>
              {formatPrice(stock.price)}
            </Text>
            <Text className={cx(differenceClass, modifierClass)}>
              {getPercentage(stock.price, stock.previousPrice)}
            </Text>
            {showAdd && (
              <Button className={`${baseClass}-add-btn`} onClick={onAdd}>
                Add
              </Button>
            )}
          </div>
          <StockChart stock={stock} />
          <StockNews category={stock.symbol} displayCount={5} />
        </div>
      </div>
    </Fragment>
  );
};

StockDetail.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  stock: PropTypes.object,
  stocks: PropTypes.array
};

export default StockDetail;
