import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { scaleTime } from 'd3-scale';

import { formatDateTick } from 'modules/stocks/helpers';
import { useStockChart } from 'modules/stocks/hooks';

import StockChartControls from './StockChartControls';

const StockChart = props => {
  const { height, hideControls, ratio, stock, width, ...otherProps } = props;
  const symbol = stock.symbol;
  const [range, setRange] = useState('1D');
  const chartData = useStockChart(symbol, range, stock.chartData);
  const baseClass = 'stock-chart';
  const showControls = !hideControls;
  const gradientId = showControls
    ? `gradient-${symbol}`
    : `gradient-${symbol}-no-controls`;

  if (!chartData) {
    return null;
  }

  const diffColor = chartData.start < chartData.end ? '#6eb26d' : '#e94741';
  const dateAccessor = d => d.date;

  return (
    <div className={baseClass}>
      {showControls && (
        <StockChartControls
          active={range}
          options={['1D', '1W', '1M', '3M', '6M']}
          onClick={setRange}
        />
      )}
      <ChartCanvas
        data={chartData.data}
        width={width}
        height={height}
        margin={{ left: 15, right: 50, top: 10, bottom: 50 }}
        ratio={ratio}
        seriesName={symbol}
        type="svg"
        xAccessor={dateAccessor}
        displayXAccessor={dateAccessor}
        xScale={scaleTime()}
        xExtents={[chartData.startDate, chartData.endDate]}
        {...otherProps}
      >
        <Chart id={chartData.end} yExtents={d => d.close}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="100%" x2="0" y2="0%">
              <stop offset="0%" stopColor={diffColor} stopOpacity={0.2} />
              <stop offset="70%" stopColor={diffColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={diffColor} stopOpacity={0.8} />
            </linearGradient>
          </defs>
          {showControls && (
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={4}
              tickStroke="#FFFFFF"
              tickFormat={formatDateTick.bind(null, chartData.range)}
            />
          )}
          {showControls && (
            <YAxis
              axisAt="right"
              orient="right"
              ticks={3}
              tickStroke="#FFFFFF"
              tickFormat={tick => `${Math.round(tick)}`}
            />
          )}
          <AreaSeries
            stroke={diffColor}
            fill={`url(#${gradientId})`}
            yAccessor={d => d.close}
          />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

StockChart.propTypes = {
  data: PropTypes.array,
  height: PropTypes.number,
  hideControls: PropTypes.bool,
  ratio: PropTypes.number,
  width: PropTypes.number,
  stock: PropTypes.object
};

StockChart.defaultProps = {
  height: 200,
  hideControls: false,
  ratio: 1,
  width: 345
};

export default StockChart;
