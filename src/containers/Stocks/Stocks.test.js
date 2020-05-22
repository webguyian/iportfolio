import React from 'react';
import { act, create } from 'react-test-renderer';

import { initialStocks } from 'modules/stocks/constants';
import * as hooks from 'modules/stocks/hooks';
import StockDetail from 'containers/Stocks/Stock/StockDetail';
import Stocks from './Stocks';

jest.mock('containers/Stocks/StockChart/StockChart', () => 'StockChart');
jest.mock('containers/Stocks/StockNews/StockNews', () => 'StockNews');
jest.mock('containers/Stocks/StockTicker/StockTicker', () => 'StockTicker');

describe('<Stocks />', () => {
  const useStocksHook = hooks.useStocks;
  const useStockExchange = hooks.useStockExchange;
  const useSearchHook = hooks.useSearch;
  const useStockDetailHook = hooks.useStockDetail;

  hooks.useStocks = jest.fn();
  hooks.useStockExchange = jest.fn();
  hooks.useSearch = jest.fn();
  hooks.useStockDetail = jest.fn();

  const searchHandlers = {
    onBlur: jest.fn(),
    onCancel: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    value: 'aa'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useStocks.mockImplementation(useStocksHook);
    hooks.useStockExchange.mockImplementation(useStockExchange);
    hooks.useSearch.mockImplementation(useSearchHook);
    hooks.useStockDetail.mockImplementation(useStockDetailHook);
  });

  it('renders correctly', async () => {
    let component;

    await act(async () => {
      hooks.useStocks.mockReturnValue([initialStocks, jest.fn()]);
      hooks.useStockExchange.mockReturnValue(initialStocks);
      component = create(<Stocks />);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with search term', async () => {
    let component;

    await act(async () => {
      hooks.useStocks.mockReturnValue([initialStocks, jest.fn()]);
      hooks.useStockExchange.mockReturnValue(initialStocks);
      hooks.useSearch.mockReturnValue(['aa', searchHandlers, true]);
      component = create(<Stocks />);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with stock detail', async () => {
    const activeStock = {
      symbol: 'AAPL',
      displaySymbol: 'AAPL',
      description: 'APPLE INC'
    };

    await act(async () => {
      hooks.useStocks.mockReturnValue([initialStocks, jest.fn()]);
      hooks.useStockExchange.mockReturnValue(initialStocks);
      hooks.useSearch.mockReturnValue(['aa', searchHandlers, true]);
      hooks.useStockDetail.mockReturnValue([activeStock, jest.fn()]);
    });

    const component = create(<Stocks />);

    expect(component).toMatchSnapshot();
  });

  it('handles adding stocks', async () => {
    const activeStock = {
      symbol: 'AAPL',
      displaySymbol: 'AAPL',
      description: 'APPLE INC'
    };
    let activeStocks = initialStocks.slice(0);
    const setStocks = stocks => {
      activeStocks = stocks;
    };

    await act(async () => {
      hooks.useStocks.mockReturnValue([activeStocks, setStocks]);
      hooks.useStockExchange.mockReturnValue(initialStocks);
      hooks.useSearch.mockReturnValue(['aa', searchHandlers, true]);
      hooks.useStockDetail.mockReturnValue([activeStock, jest.fn()]);
    });

    const component = create(<Stocks />);
    const detail = component.root.findByType(StockDetail);

    expect(activeStocks.length).toEqual(5);
    expect(searchHandlers.onCancel).not.toHaveBeenCalled();
    await act(async () => {
      detail.props.onAdd();
    });
    expect(searchHandlers.onCancel).toHaveBeenCalled();
    expect(activeStocks.length).toEqual(6);
  });

  it('handles deleting stocks', async () => {
    hooks.useStocks.mockReturnValue([initialStocks, jest.fn()]);
    hooks.useStockExchange.mockReturnValue(initialStocks);

    const component = create(<Stocks />);
    const stock = component.root.findByProps({ symbol: 'AAPL' });

    await act(async () => {
      stock.props.onDelete();
    });

    expect(component).toMatchSnapshot();
  });

  it('handles toggling edit', async () => {
    await act(async () => {
      hooks.useStocks.mockReturnValue([initialStocks, jest.fn()]);
      hooks.useStockExchange.mockReturnValue(initialStocks);
    });

    const component = create(<Stocks />);
    const [button] = component.root.findAllByProps({
      modifier: 'anchor'
    });

    await act(async () => {
      button.props.onClick();
    });

    expect(component).toMatchSnapshot();
  });
});
