import { controls, zero } from './constants';

export const calculate = (current, control, next) => {
  const [digit, nextDigit] = [current, next].map(d => Number(d));

  let calculation;

  switch (control) {
    case controls.divide:
      calculation = digit / nextDigit;
      break;
    case controls.multiply:
      calculation = digit * nextDigit;
      break;
    case controls.subtract:
      calculation = digit - nextDigit;
      break;
    case controls.add:
      calculation = digit + nextDigit;
      break;
    default:
      break;
  }

  if (typeof calculation === 'undefined') {
    return zero;
  }

  const result = String(calculation);

  return result.slice(0, 8);
};

export const getSymbols = (display = zero) => {
  const {
    add,
    allClear,
    clear,
    decimal,
    divideAlt,
    equals,
    multiplyAlt,
    percent,
    positiveNegative,
    subtract
  } = controls;
  const clearSymbol = display === zero ? allClear : clear;

  return [
    [clearSymbol, positiveNegative, percent, divideAlt],
    ['7', '8', '9', multiplyAlt],
    ['4', '5', '6', subtract],
    ['1', '2', '3', add],
    [zero, decimal, equals]
  ];
};
