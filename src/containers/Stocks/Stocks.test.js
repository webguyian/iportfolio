import React from 'react';
import { act, create } from 'react-test-renderer';

import { initialStocks } from 'containers/Stocks/constants';
import * as hooks from 'containers/Stocks/hooks';
import StockDetail from 'containers/Stocks/Stock/StockDetail';
import Stocks from './Stocks';

jest.mock('containers/Stocks/StockChart/StockChart', () => 'StockChart');
jest.mock('containers/Stocks/StockNews/StockNews', () => 'StockNews');
jest.mock('containers/Stocks/StockTicker/StockTicker', () => 'StockTicker');

describe('<Stocks />', () => {
  const useStocksHook = hooks.useStocks;
  const useSearchHook = hooks.useSearch;
  const useStockDetailHook = hooks.useStockDetail;

  hooks.useStocks = jest.fn();
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
    hooks.useSearch.mockImplementation(useSearchHook);
    hooks.useStockDetail.mockImplementation(useStockDetailHook);
  });

  it('renders correctly', () => {
    hooks.useStocks.mockReturnValue([initialStocks, jest.fn(), initialStocks]);

    const component = create(<Stocks />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with search term', () => {
    hooks.useStocks.mockReturnValue([initialStocks, jest.fn(), initialStocks]);
    hooks.useSearch.mockReturnValue(['aa', searchHandlers, true]);
    const component = create(<Stocks />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with stock detail', () => {
    const activeStock = {
      symbol: 'AAPL',
      displaySymbol: 'AAPL',
      description: 'APPLE INC'
    };

    hooks.useStocks.mockReturnValue([initialStocks, jest.fn(), initialStocks]);
    hooks.useSearch.mockReturnValue(['aa', searchHandlers, true]);
    hooks.useStockDetail.mockReturnValue([activeStock, jest.fn()]);
    const component = create(<Stocks />);

    expect(component).toMatchSnapshot();
  });

  it('handles adding stocks', () => {
    const activeStock = {
      symbol: 'AAPL',
      displaySymbol: 'AAPL',
      description: 'APPLE INC'
    };
    let activeStocks = initialStocks.slice(0);
    const setStocks = stocks => {
      activeStocks = stocks;
    };

    hooks.useStocks.mockReturnValue([activeStocks, setStocks, initialStocks]);
    hooks.useSearch.mockReturnValue(['aa', searchHandlers, true]);
    hooks.useStockDetail.mockReturnValue([activeStock, jest.fn()]);
    const component = create(<Stocks />);
    const detail = component.root.findByType(StockDetail);

    expect(activeStocks.length).toEqual(5);
    expect(searchHandlers.onCancel).not.toHaveBeenCalled();
    act(() => {
      detail.props.onAdd();
    });
    expect(searchHandlers.onCancel).toHaveBeenCalled();
    expect(activeStocks.length).toEqual(6);
  });

  it('handles deleting stocks', () => {
    hooks.useStocks.mockReturnValue([initialStocks, jest.fn(), initialStocks]);
    const component = create(<Stocks />);
    const stock = component.root.findByProps({ symbol: 'AAPL' });

    act(() => {
      stock.props.onDelete();
    });

    expect(component).toMatchSnapshot();
  });

  it('handles toggling edit', () => {
    hooks.useStocks.mockReturnValue([initialStocks, jest.fn(), initialStocks]);
    const component = create(<Stocks />);
    const [button] = component.root.findAllByProps({
      className: 'ui-btn--anchor'
    });

    act(() => {
      button.props.onClick();
    });

    expect(component).toMatchSnapshot();
  });
});
