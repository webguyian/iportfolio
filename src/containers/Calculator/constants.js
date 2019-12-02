export const add = '+';
export const allClear = 'AC';
export const backspace = 'Backspace';
export const clear = 'C';
export const decimal = '.';
export const divide = '/';
export const divideAlt = '\u00f7';
export const enter = 'Enter';
export const equals = '=';
export const multiply = '*';
export const multiplyAlt = '\u00d7';
export const percent = '%';
export const positiveNegative = '+/-';
export const subtract = '-';
export const zero = '0';

export const controls = {
  add,
  allClear,
  clear,
  decimal,
  divide,
  divideAlt,
  equals,
  multiply,
  multiplyAlt,
  percent,
  positiveNegative,
  subtract
};

export const allOperators = [
  add,
  allClear,
  clear,
  decimal,
  divide,
  divideAlt,
  equals,
  multiply,
  multiplyAlt,
  percent,
  positiveNegative,
  subtract
];

export const operators = [
  add,
  allClear,
  clear,
  divide,
  divideAlt,
  multiply,
  multiplyAlt,
  positiveNegative,
  subtract
];

export const controlLabels = {
  [allClear]: 'All clear',
  [clear]: 'Clear',
  [positiveNegative]: 'Positive/negative',
  [percent]: 'Percent',
  [multiplyAlt]: 'Multiply',
  [divideAlt]: 'Divide',
  [add]: 'Add',
  [subtract]: 'Subtract',
  [equals]: 'Equals',
  [decimal]: 'Decimal'
};

export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const keys = {
  backspace,
  enter
};

export const operatorKeys = [backspace, enter]
  .concat(...allOperators)
  .concat(numbers);
