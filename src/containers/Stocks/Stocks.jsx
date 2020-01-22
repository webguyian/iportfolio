import React, { useState } from 'react';
import classNames from 'classnames';

import { initialStocks } from './constants';
import { useSearch, useStockSearch, useStocks, useStockDetail } from './hooks';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import Text from 'components/Text/Text';

import Stock from 'containers/Stocks/Stock/Stock';
import StockDetail from 'containers/Stocks/Stock/StockDetail';
import StockSearch from 'containers/Stocks/StockSearch/StockSearch';
import StockNews from 'containers/Stocks/StockNews/StockNews';

const Stocks = () => {
  const [stocks, setStocks, allStocks] = useStocks(initialStocks);
  const [searchTerm, searchHandlers, hasSearch] = useSearch();
  const filteredStocks = useStockSearch(allStocks, searchTerm);
  const [activeStock, setActiveStock] = useStockDetail();
  const [isEdit, setEdit] = useState(false);
  const visibleStocks = searchTerm.length > 1 ? filteredStocks : stocks;
  const baseClass = 'stocks-app';
  const withDetailClass =
    (activeStock || isEdit) && `${baseClass}--with-detail`;
  const withSearchClass = hasSearch && `${baseClass}--with-search`;
  const actionLabel = isEdit ? 'Done' : 'Edit';
  const handleAddStock = () => {
    setStocks(stocks.concat(activeStock));
    setActiveStock(null);
    searchHandlers.onCancel();
  };
  const deleteStock = currentStock => {
    setStocks(stocks.filter(stock => stock !== currentStock));
  };
  const handleEdit = () => {
    setEdit(edit => !edit);
  };

  return (
    <div className={classNames(baseClass, withDetailClass, withSearchClass)}>
      <header className={`${baseClass}-header`}>
        <div className={`${baseClass}-header-content`}>
          <Text className={`${baseClass}-title`} element="h1" type="display">
            Stocks
          </Text>
          <Text className={`${baseClass}-date`} element="h2" type="display">
            <DateTime format="MMMM d" />
          </Text>
        </div>
        <Button className="ui-btn--anchor" onClick={handleEdit}>
          {actionLabel}
        </Button>
      </header>
      <StockSearch {...searchHandlers} />
      <ul className={`${baseClass}-list`}>
        {visibleStocks.map(stock => (
          <Stock
            key={stock.displaySymbol}
            {...stock}
            onClick={setActiveStock.bind(null, stock)}
            onDelete={deleteStock.bind(null, stock)}
            hidePrice={isEdit}
          />
        ))}
      </ul>
      <StockDetail
        stock={activeStock}
        stocks={stocks}
        onAdd={handleAddStock}
        onClick={setActiveStock}
        onClose={setActiveStock.bind(null, null)}
      />
      <StockNews draggable />
    </div>
  );
};

export default Stocks;
