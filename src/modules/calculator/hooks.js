import { useEffect, useRef, useState } from 'react';
import { controls, operators, zero } from './constants';
import { calculate } from './helpers';

export const useCalculator = (initial = zero) => {
  const [output, setOutput] = useState(initial);
  const [display, setDisplay] = useState(initial);
  const [operator, setOperator] = useState(null);

  const setOutputAndDisplay = value => {
    setOutput(value);
    setDisplay(value);
  };

  const setKey = key => {
    const isOperator = operators.includes(key);

    if (key === controls.allClear) {
      // Reset operator and output
      setOperator(null);
      return setOutputAndDisplay(zero);
    }

    if (key === controls.clear) {
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

    if (key === controls.positiveNegative) {
      const number = String(display * -1);

      if (output === display) {
        return setOutputAndDisplay(number);
      }

      return setDisplay(number);
    }

    if (key === controls.percent) {
      const percent = String(display / 100);

      if (output === display) {
        return setOutputAndDisplay(percent);
      }

      return setDisplay(percent);
    }

    if (isOperator) {
      if (operator && output !== display) {
        const calculation = calculate(output, operator, display);

        setOutputAndDisplay(calculation);
      }

      // Set operator
      if (key === controls.multiplyAlt) {
        // Override multiplication symbol
        return setOperator(controls.multiply);
      }

      if (key === controls.divideAlt) {
        // Override division symbol
        return setOperator(controls.divide);
      }

      return setOperator(key);
    }

    if (key === controls.equals) {
      if (!operator) {
        return;
      }

      const calculation = calculate(output, operator, display);

      return setOutputAndDisplay(calculation);
    }

    if (operator) {
      let nextDisplay = key === controls.decimal ? '0.' : key;

      if (output !== display) {
        nextDisplay = display === zero ? key : display.concat(key);
      }

      return setDisplay(nextDisplay);
    }
    const digits = display === zero ? key : display.concat(key);

    return setOutputAndDisplay(digits);
  };

  return [display, setKey];
};

export const useCalculatorRef = (ref = null) => {
  const calculatorEl = useRef(ref);

  useEffect(() => {
    const element = calculatorEl && calculatorEl.current;

    if (element) {
      // Add focus to wrapper element
      element.focus();
    }
  }, [calculatorEl]);

  return calculatorEl;
};
