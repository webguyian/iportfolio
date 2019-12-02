import React from 'react';
import renderer from 'react-test-renderer';
import { useCalculator, useCalculatorRef } from './hooks';

describe('Calculator hooks', () => {
  const TestComponent = ({ callback }) => {
    callback();
    return null;
  };
  const calculatorEl = {
    id: 'ref',
    focus: jest.fn()
  };
  const createNodeMock = () => {
    return calculatorEl;
  };
  const testHook = callback => {
    renderer.create(<TestComponent callback={callback} />, { createNodeMock });
  };

  let calculatorRef, display, setKey;

  beforeEach(() => {
    testHook(() => {
      [display, setKey] = useCalculator();
      calculatorRef = useCalculatorRef(calculatorEl);
    });
  });

  describe('useCalculator', () => {
    it('handles display', () => {
      expect(display).toEqual('0');
    });

    it('handles setKey with AC key', () => {
      expect(setKey('AC')).toBeUndefined();
    });

    it('handles setKey with C key', () => {
      expect(setKey('C')).toBeUndefined();
    });

    it('handles setKey with +/- key', () => {
      expect(setKey('+/-')).toBeUndefined();
    });

    it('handles setKey with % key', () => {
      expect(setKey('%')).toBeUndefined();
    });

    it('handles setKey with = key', () => {
      expect(setKey('=')).toBeUndefined();
    });
  });

  describe('useCalculatorRef', () => {
    it('handles element focus', () => {
      expect(calculatorRef.current.focus).toHaveBeenCalled();
    });

    it('handles null elements', () => {
      let emptyRef;
      const nullNodeMock = () => {
        return calculatorEl;
      };

      const emptyTestHook = callback => {
        renderer.create(<TestComponent callback={callback} />, {
          createNodeMock: nullNodeMock
        });
      };

      emptyTestHook(() => {
        emptyRef = useCalculatorRef();
      });
      expect(emptyRef.current).toBe(null);
    });
  });
});
