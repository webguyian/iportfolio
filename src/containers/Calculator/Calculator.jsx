import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';

import RoundedButton from 'components/Button/RoundedButton';
import Text from 'components/Text/Text';

const Calculator = () => {
  const baseClass = 'calculator-app';
  const rowClass = `${baseClass}-row`;
  const [operator, setOperator] = useState(null);
  const [output, setOutput] = useState('0');
  const [display, setDisplay] = useState('0');
  const calculatorEl = useRef(null);
  const outputClass = `${baseClass}-output`;
  const lengthClass = `${outputClass}--${display.length}`;
  const controls = ['AC', '+/-', '/', '\u00f7', '*', '\u00d7', '-', '+'];
  const symbols = [
    [display === '0' && !operator ? 'AC' : 'C', '+/-', '%', '\u00f7'],
    ['7', '8', '9', '\u00d7'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];
  const controlLabels = {
    AC: 'All clear',
    C: 'Clear',
    '+/-': 'Positive/negative',
    '%': 'Percent',
    '\u00d7': 'Multiply',
    '\u00f7': 'Divide',
    '+': 'Add',
    '-': 'Subtract',
    '=': 'Equals',
    '.': 'Decimal'
  };

  const setOutputAndDisplay = value => {
    setOutput(value);
    setDisplay(value);
  };

  const calculate = (current, control, next) => {
    const [digit, nextDigit] = [current, next].map(d => Number(d));
    let calculation;

    switch (control) {
      case '/':
        calculation = digit / nextDigit;
        break;
      case '*':
        calculation = digit * nextDigit;
        break;
      case '-':
        calculation = digit - nextDigit;
        break;
      case '+':
        calculation = digit + nextDigit;
        break;
      default:
        break;
    }

    if (typeof calculation === 'undefined') {
      return '0';
    }

    const result = String(calculation);

    return result.slice(0, 8);
  };

  const setKey = key => {
    const isControl = controls.includes(key);
    const zero = '0';

    if (key === 'AC') {
      // Reset operator and output
      setOperator(null);
      return setOutputAndDisplay(zero);
    }

    if (key === 'C') {
      // Reset display
      if (output === zero || display === zero) {
        setOperator(null);
      }

      return setDisplay(zero);
    }

    if (output.length === 9) {
      // Exit early for long digits
      return;
    }

    if (key === '+/-') {
      const number = String(display * -1);

      if (output === display) {
        return setOutputAndDisplay(number);
      }

      return setDisplay(number);
    }

    if (key === '%') {
      const percent = String(display / 100);

      if (output === display) {
        return setOutputAndDisplay(percent);
      }

      return setDisplay(percent);
    }

    if (isControl) {
      if (operator && output !== display) {
        const calculation = calculate(output, operator, display);

        setOutputAndDisplay(calculation);
      }

      // Set operator
      if (key === '\u00d7') {
        // Override multiplication symbol
        return setOperator('*');
      }

      if (key === '\u00f7') {
        // Override division symbol
        return setOperator('/');
      }

      return setOperator(key);
    }

    if (key === '=') {
      if (!operator) {
        return;
      }

      const calculation = calculate(output, operator, display);

      return setOutputAndDisplay(calculation);
    }

    if (operator) {
      let nextDisplay = key === '.' ? '0.' : key;

      if (output !== display) {
        nextDisplay = display === zero ? key : display.concat(key);
      }

      return setDisplay(nextDisplay);
    }
    const digits = display === zero ? key : display.concat(key);

    return setOutputAndDisplay(digits);
  };

  const handleKeyPress = ({ key }) => {
    const keys = ['Backspace', 'Enter', '/', '*'].concat(...symbols);

    if (!keys.includes(key)) {
      return false;
    }

    if (key === 'Backspace') {
      return setKey('C');
    }

    if (key === 'Enter') {
      return setKey('=');
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

  useEffect(() => {
    // Add focus to wrapper element
    calculatorEl.current.focus();
  }, []);

  return (
    <div className={baseClass}>
      <output
        className={classNames(outputClass, lengthClass)}
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
