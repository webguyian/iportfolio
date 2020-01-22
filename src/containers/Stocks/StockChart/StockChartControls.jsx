import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';

const StockChartControls = props => {
  const { active, onClick, options } = props;
  const baseClass = 'stock-chart-controls';
  const optionClass = 'stock-chart-control';
  const activeClass = `${optionClass}--active`;

  return (
    <ul className={baseClass}>
      {options.map(control => (
        <li
          key={control}
          className={classNames(optionClass, control === active && activeClass)}
        >
          <Button onClick={onClick.bind(null, control)}>{control}</Button>
        </li>
      ))}
    </ul>
  );
};

StockChartControls.propTypes = {
  active: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default StockChartControls;
