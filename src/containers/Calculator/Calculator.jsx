import React from 'react';
import cx from 'classnames';

import RoundedButton from 'components/Button/RoundedButton';
import Text from 'components/Text/Text';
import {
  controls,
  controlLabels,
  keys,
  operatorKeys
} from 'modules/calculator/constants';
import { getSymbols } from 'modules/calculator/helpers';
import { useCalculator, useCalculatorRef } from 'modules/calculator/hooks';

const Calculator = () => {
  const baseClass = 'calculator-app';
  const rowClass = `${baseClass}-row`;
  const calculatorEl = useCalculatorRef(null);
  const [display, setKey] = useCalculator('0');
  const outputClass = `${baseClass}-output`;
  const lengthClass = `${outputClass}--${display.length}`;
  const symbols = getSymbols(display);

  const handleKeyPress = ({ key }) => {
    if (!operatorKeys.includes(key)) {
      return false;
    }

    if (key === keys.backspace) {
      return setKey(controls.clear);
    }

    if (key === keys.enter) {
      return setKey(controls.equals);
    }

    return setKey(key);
  };

  const handleClickOutput = () => {
    // Add focus to wrapper element
    calculatorEl.current.focus();

    if (navigator.clipboard) {
      // Copy display text to clipboard
      navigator.clipboard.writeText(display);
    }
  };

  return (
    <div className={baseClass}>
      <output
        className={cx(outputClass, lengthClass)}
        onClick={handleClickOutput}
      >
        {display}
      </output>
      <div
        className={`${baseClass}-input`}
        ref={calculatorEl}
        tabIndex={-1}
        onKeyUp={handleKeyPress}
      >
        {symbols.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`${rowClass} ${rowClass}--${rowIndex + 1}`}
          >
            {row.map((symbol, symbolIndex) => (
              <RoundedButton
                key={symbolIndex}
                onClick={setKey.bind(null, symbol)}
              >
                {symbol}
                <Text type="accessible">{controlLabels[symbol]}</Text>
              </RoundedButton>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
