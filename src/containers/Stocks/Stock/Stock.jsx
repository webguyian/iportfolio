import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatPrice, getPercentage } from 'modules/stocks/helpers';
import { useSwipeOffset } from 'modules/stocks/hooks';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

const Stock = props => {
  const {
    description,
    hidePrice,
    onClick,
    onDelete,
    previousPrice,
    price,
    symbol
  } = props;
  const [handlers, offset] = useSwipeOffset(onDelete.bind(null, symbol));
  const baseClass = 'stock';
  const swipedClass = (offset || hidePrice) && `${baseClass}--swiped`;
  const swipingClass = offset > 80 && `${baseClass}--swiping`;
  const differenceClass = `${baseClass}-difference`;
  const modifierClass =
    price > previousPrice
      ? `${differenceClass}--up`
      : `${differenceClass}--down`;

  const setStockDetail = () => {
    if (offset) {
      return;
    }

    onClick();
  };

  return (
    <li className={cx(baseClass, swipedClass, swipingClass)} {...handlers}>
      <Button className={`${baseClass}-btn`} onClick={setStockDetail}>
        <div className={`${baseClass}-name`}>
          <Text className={`${baseClass}-symbol`} modifier="bold">
            {symbol}
          </Text>
          <Text className={`${baseClass}-description`}>{description}</Text>
        </div>
        {price && !hidePrice && (
          <div className={`${baseClass}-value`}>
            <Text className={`${baseClass}-price`}>{formatPrice(price)}</Text>
            <Text className={cx(differenceClass, modifierClass)}>
              {getPercentage(price, previousPrice)}
            </Text>
          </div>
        )}
      </Button>
      <Button className="ui-btn--delete" onClick={onDelete}>
        Delete
      </Button>
    </li>
  );
};

Stock.propTypes = {
  description: PropTypes.string.isRequired,
  hidePrice: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  previousPrice: PropTypes.number,
  price: PropTypes.number,
  symbol: PropTypes.string.isRequired
};

Stock.defaultProps = {
  hidePrice: false
};

export default Stock;
