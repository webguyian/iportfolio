import React from 'react';
import { act, create } from 'react-test-renderer';

import Calculator from './Calculator';

import * as hooks from 'modules/calculator/hooks';

describe('<Calculator />', () => {
  const originalUseCalculator = hooks.useCalculator;

  hooks.useCalculator = jest.fn();
  const setKey = jest.fn();
  const calculatorEl = {
    focus: jest.fn()
  };
  const createNodeMock = element => {
    return element.props.tabIndex === -1 ? calculatorEl : null;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useCalculator.mockImplementation(originalUseCalculator);
  });

  it('renders correctly', () => {
    const component = create(<Calculator />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles output clicks', () => {
    const component = create(<Calculator />, {
      createNodeMock
    }).root;
    const output = component.findByType('output');

    expect(calculatorEl.focus).not.toHaveBeenCalled();
    output.props.onClick();
    expect(calculatorEl.focus).toHaveBeenCalled();
  });

  it('handles output clicks with clipboard', () => {
    Object.defineProperty(window.navigator, 'clipboard', {
      value: { writeText: jest.fn() }
    });

    const component = create(<Calculator />, {
      createNodeMock
    }).root;
    const output = component.findByType('output');

    calculatorEl.focus.mockClear();

    expect(calculatorEl.focus).not.toHaveBeenCalled();
    output.props.onClick();
    expect(calculatorEl.focus).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('0');
  });

  it('handles keypress for unknown key', () => {
    const component = create(<Calculator />, {
      createNodeMock
    }).root;
    const input = component.findByProps({ tabIndex: -1 });
    const mockEvent = {
      key: 'unknown'
    };

    expect(input.props.onKeyUp(mockEvent)).toBe(false);
  });

  it('handles keypress for Backspace key', () => {
    const component = create(<Calculator />, {
      createNodeMock
    }).root;
    const input = component.findByProps({ tabIndex: -1 });
    const mockEvent = {
      key: 'Backspace'
    };

    input.props.onKeyUp(mockEvent);
  });

  it('handles keypress for Enter key', () => {
    const component = create(<Calculator />, {
      createNodeMock
    }).root;
    const input = component.findByProps({ tabIndex: -1 });
    const mockEvent = {
      key: 'Enter'
    };

    input.props.onKeyUp(mockEvent);
  });

  it('handles keypress for + key', () => {
    hooks.useCalculator.mockImplementation(() => ['0', setKey]);

    const component = create(<Calculator />, {
      createNodeMock
    }).root;
    const input = component.findByProps({ tabIndex: -1 });
    const mockEvent = {
      key: '+'
    };

    act(() => {
      input.props.onKeyUp(mockEvent);
    });

    expect(setKey).toHaveBeenCalledWith('+');
  });
});
