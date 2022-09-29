import React from 'react';
import { act, create } from 'react-test-renderer';
import * as hooks from 'react-swipeable';

import { TestComponent, mockTime } from 'utilities/test';
import * as browserHooks from 'modules/browser/hooks';
import { useRefControlledFocus, useReminders, useSwipeOffset } from './hooks';

jest.mock('react-swipeable', () => ({
  __esModule: true,
  ...jest.requireActual('react-swipeable')
}));

describe('Reminders hooks', () => {
  const useSwipeableHook = hooks.useSwipeable;

  hooks.useSwipeable = jest.fn();
  browserHooks.useLocalStorage = jest.fn();

  const ref = {
    id: 'ref',
    focus: jest.fn()
  };
  const createNodeMock = () => ref;
  const testHook = callback => {
    return create(<TestComponent callback={callback} />, {
      createNodeMock
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useSwipeable.mockImplementation(useSwipeableHook);
  });

  describe('useRefControlledFocus', () => {
    it('returns ref', () => {
      const input = { focus: jest.fn() };

      let inputRef;

      testHook(() => {
        inputRef = useRefControlledFocus(false);
      });

      expect(inputRef.current).toBeNull();

      testHook(() => {
        inputRef = useRefControlledFocus(false, input);
      });

      expect(inputRef.current).toEqual(input);
    });

    it('adds focus to ref', () => {
      const input = { focus: jest.fn() };

      let inputRef;

      const Component = testHook(() => {
        inputRef = useRefControlledFocus(false, input);
      });

      expect(inputRef.current).toEqual(input);

      act(() => {
        const callback = () => {
          useRefControlledFocus(true, input);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(input.focus).toHaveBeenCalled();
    });
  });

  describe('useReminders', () => {
    let reminders;
    const exampleReminders = [
      { id: mockTime, checked: false, value: 'Add tests' },
      { id: mockTime + 1, checked: false, value: '' }
    ];
    const setReminders = jest.fn();

    it('updates reminders', async () => {
      browserHooks.useLocalStorage.mockReturnValueOnce([[], setReminders]);
      const Component = testHook(() => {
        [reminders] = useReminders();
      });

      expect(reminders).toEqual([]);

      await act(async () => {
        browserHooks.useLocalStorage.mockReturnValueOnce([
          exampleReminders,
          setReminders
        ]);
        const useCallback = () => {
          [reminders] = useReminders();
        };

        Component.update(<TestComponent callback={useCallback} />);
      });

      expect(reminders).toEqual(exampleReminders);
      expect(reminders).toHaveLength(2);
    });

    it('filters out empty reminders', () => {
      browserHooks.useLocalStorage.mockReturnValueOnce([
        exampleReminders,
        setReminders
      ]);
      const Component = testHook(() => {
        [reminders] = useReminders();
      });

      expect(setReminders).not.toHaveBeenCalled();

      act(() => {
        Component.unmount();
      });

      expect(setReminders).toHaveBeenCalledWith(reminders.slice(0, 1));
    });
  });

  describe('useSwipeOffset', () => {
    it('returns handlers and offset', () => {
      let handlers, offset, setOffset;

      testHook(() => {
        const callback = jest.fn();

        [handlers, offset, setOffset] = useSwipeOffset(callback);
      });

      expect(handlers.ref).toBeDefined();
      expect(handlers.onMouseDown).toBeDefined();
      expect(offset).toEqual(0);
      expect(setOffset).toBeDefined();
    });

    it('calls useSwipeable with events', () => {
      testHook(() => {
        const callback = jest.fn();

        useSwipeOffset(callback);
      });

      expect(hooks.useSwipeable).toHaveBeenCalledWith({
        onSwipedLeft: expect.any(Function),
        onSwipedRight: expect.any(Function),
        onSwiping: expect.any(Function),
        trackMouse: true
      });

      const { onSwipedLeft, onSwipedRight, onSwiping } =
        hooks.useSwipeable.mock.calls[0][0];
      const eventInfo = {
        deltaX: 50,
        dir: 'Right'
      };

      expect(onSwiping(eventInfo)).toBe(false);
      expect(onSwipedRight()).toBe(false);
      expect(onSwipedLeft(eventInfo)).toBeUndefined();
    });

    it('calls handleSwipe with Left direction', () => {
      let offset;

      testHook(() => {
        const callback = jest.fn();

        [, offset] = useSwipeOffset(callback);
      });

      const { onSwiping } = hooks.useSwipeable.mock.calls[0][0];
      const eventInfo = {
        deltaX: 100,
        dir: 'Left'
      };

      expect(offset).toEqual(0);

      act(() => {
        onSwiping(eventInfo);
      });

      expect(offset).toEqual(100);
    });

    it('calls handleSwipeRight with offset', () => {
      let offset;

      testHook(() => {
        const callback = jest.fn();

        [, offset] = useSwipeOffset(callback, 100);
      });

      const { onSwipedRight } = hooks.useSwipeable.mock.calls[0][0];

      expect(offset).toEqual(100);

      act(() => {
        onSwipedRight();
      });

      expect(offset).toEqual(0);
    });

    it('calls handleSwipeLeft with delta over 80', () => {
      const callback = jest.fn();
      const eventInfo = {
        deltaX: 100,
        dir: 'Left'
      };

      testHook(() => {
        useSwipeOffset(callback);
      });

      const { onSwipedLeft } = hooks.useSwipeable.mock.calls[0][0];

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        onSwipedLeft(eventInfo);
      });

      expect(callback).toHaveBeenCalledWith(eventInfo);
    });
  });
});
