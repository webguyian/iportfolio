import React from 'react';
import { act, create } from 'react-test-renderer';
import * as hooks from 'react-swipeable';

import { TestComponent, mockTime } from 'utilities/test';
import {
  useLocalStorage,
  useRefFocus,
  useRefControlledFocus,
  useReminders,
  useSwipeOffset
} from './hooks';

describe('Reminders hooks', () => {
  const useSwipeableHook = hooks.useSwipeable;

  hooks.useSwipeable = jest.fn();

  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });

  const ref = {
    id: 'ref',
    focus: jest.fn()
  };
  const createNodeMock = () => {
    return ref;
  };
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

  describe('useLocalStorage', () => {
    let reminders, setReminders;

    it('gets values', () => {
      testHook(() => {
        [reminders, setReminders] = useLocalStorage('reminders', []);
      });

      expect(reminders).toEqual([]);
      const updatedReminders = [
        { id: mockTime, checked: false, value: 'Add tests' }
      ];

      act(() => {
        setReminders(updatedReminders);
      });

      expect(reminders).toEqual(updatedReminders);
    });

    it('sets values', () => {
      testHook(() => {
        [reminders, setReminders] = useLocalStorage('reminders', []);
      });

      const updatedReminders = [
        { id: mockTime, checked: false, value: 'Add tests' }
      ];

      act(() => {
        setReminders(updatedReminders);
      });

      expect(reminders).toEqual(updatedReminders);

      act(() => {
        setReminders(() => []);
      });

      expect(reminders).toEqual([]);
    });

    it('catches errors with getValue', () => {
      let getValue, setValue;

      testHook(() => {
        [reminders, setValue, getValue] = useLocalStorage('reminders', []);
      });

      const updatedReminders = [
        { id: mockTime, checked: false, value: 'Add tests' }
      ];

      act(() => {
        setValue(updatedReminders);
      });

      expect(reminders).toEqual(updatedReminders);
      expect(window.localStorage.getItem).toHaveBeenCalledWith('reminders');
      window.localStorage.getItem.mockReturnValue(new Error());
      expect(getValue()).toEqual([]);
    });

    it('catches errors with setValue', () => {
      testHook(() => {
        [reminders, setReminders] = useLocalStorage('reminders', []);
      });

      const updatedReminders = [
        { id: mockTime, checked: false, value: 'Add tests' }
      ];

      act(() => {
        setReminders(updatedReminders);
      });

      expect(reminders).toEqual(updatedReminders);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'reminders',
        JSON.stringify(updatedReminders)
      );

      act(() => {
        window.localStorage.setItem.mockImplementationOnce(() => {
          throw Error();
        });

        setReminders(() => []);
      });

      expect(reminders).toEqual([]);
    });
  });

  describe('useRefFocus', () => {
    it('returns ref', () => {
      let buttonRef;

      testHook(() => {
        buttonRef = useRefFocus();
      });

      expect(buttonRef.current).toBeNull();
    });

    it('adds focus to ref', () => {
      const button = { focus: jest.fn() };
      let buttonRef;

      const Component = testHook(() => {
        buttonRef = useRefFocus(button);
      });

      expect(buttonRef.current).toEqual(button);

      act(() => {
        Component.update();
      });

      expect(button.focus).toHaveBeenCalled();
    });
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
    const reminders = [
      { id: mockTime, checked: false, value: 'Add tests' },
      { id: mockTime + 1, checked: false, value: '' }
    ];
    const setReminders = jest.fn();
    let remindersRef;

    it('updates reminders', () => {
      const Component = testHook(() => {
        remindersRef = useReminders([], setReminders);
      });

      expect(remindersRef.current).toEqual([]);

      const callback = () => {
        remindersRef = useReminders(reminders, setReminders);
      };

      act(() => {
        Component.update(<TestComponent callback={callback} />);
      });

      expect(remindersRef.current).toEqual(reminders);
      expect(remindersRef.current).toHaveLength(2);
    });

    it('filters out empty reminders', () => {
      const Component = testHook(() => {
        remindersRef = useReminders(reminders, setReminders);
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

      const {
        onSwipedLeft,
        onSwipedRight,
        onSwiping
      } = hooks.useSwipeable.mock.calls[0][0];
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
