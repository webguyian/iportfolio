import { calculate, getSymbols } from './helpers';

describe('Calculator helpers', () => {
  it('handles calculate function', () => {
    expect(calculate('1', '+', '2')).toEqual('3');
    expect(calculate('2', '-', '1')).toEqual('1');
    expect(calculate('2', '*', '2')).toEqual('4');
    expect(calculate('4', '/', '2')).toEqual('2');
  });

  it('handles calculate function with unknown control', () => {
    expect(calculate('1', '.', '2')).toEqual('0');
  });

  it('handles calculate function with large digits', () => {
    expect(99999 * 99999).toEqual(9999800001);
    expect(calculate('99999', '*', '99999')).toEqual('99998000');
  });

  it('handles getSymbols function', () => {
    expect(getSymbols()).toEqual([
      ['AC', '+/-', '%', '÷'],
      ['7', '8', '9', '×'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '+'],
      ['0', '.', '=']
    ]);
  });

  it('handles getSymbols function with non-zero display', () => {
    expect(getSymbols('100')).toEqual([
      ['C', '+/-', '%', '÷'],
      ['7', '8', '9', '×'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '+'],
      ['0', '.', '=']
    ]);
  });
});
