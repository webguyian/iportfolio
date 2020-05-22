import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { formatPrice, getPercentage } from 'modules/stocks/helpers';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import StockChart from 'containers/Stocks/StockChart/StockChart';

const Stock = props => {
  const { onClick, stock } = props;
  const { price, previousPrice, symbol } = stock;
  const baseClass = 'stock-tick';
  const differenceClass = `${baseClass}-difference`;
  const modifierClass =
    price > previousPrice
      ? `${differenceClass}--up`
      : `${differenceClass}--down`;

  return (
    <li className={baseClass}>
      <Button className={`${baseClass}-btn`} onClick={onClick}>
        <div className={`${baseClass}-content`}>
          <Text className={`${baseClass}-symbol`} modifier="bold">
            {symbol}
          </Text>
          <Text className={`${baseClass}-price`} modifier="bold">
            {formatPrice(price)}
          </Text>
          <Text className={classNames(differenceClass, modifierClass)}>
            {getPercentage(price, previousPrice)}
          </Text>
        </div>
        <StockChart
          hideControls
          stock={stock}
          mouseMoveEvent={false}
          panEvent={false}
          zoomEvent={false}
        />
      </Button>
    </li>
  );
};

Stock.propTypes = {
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired
};

export default Stock;
