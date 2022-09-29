import React from 'react';
import { act, create } from 'react-test-renderer';
import * as hooks from 'react-swipeable';

import { TestComponent } from 'utilities/test';
import { useRefFocus, useSwipeOffset } from 'modules/notes/hooks';

jest.mock('react-swipeable', () => ({
  __esModule: true,
  ...jest.requireActual('react-swipeable')
}));

describe('Notes hooks', () => {
  const useSwipeableHook = hooks.useSwipeable;

  hooks.useSwipeable = jest.fn();

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

  describe('useRefFocus', () => {
    it('returns ref', () => {
      let buttonRef;

      testHook(() => {
        buttonRef = useRefFocus();
      });

      expect(buttonRef.current).toBeNull();
    });

    it('adds focus to ref', () => {
      const Component = testHook(() => {
        useRefFocus(true, ref);
      });

      expect(ref.focus).not.toHaveBeenCalled();

      act(() => {
        Component.update();
      });

      expect(ref.focus).toHaveBeenCalled();
    });

    it('prevents focus from being called', () => {
      const Component = testHook(() => {
        useRefFocus(false, ref);
      });

      expect(ref.focus).not.toHaveBeenCalled();

      act(() => {
        Component.update();
      });

      expect(ref.focus).not.toHaveBeenCalled();
    });
  });

  describe('useSwipeOffset', () => {
    it('returns handlers and offset', () => {
      let handlers, hasOffset, setOffset;

      testHook(() => {
        const callback = jest.fn();

        [handlers, hasOffset, setOffset] = useSwipeOffset(callback);
      });

      expect(handlers.ref).toBeDefined();
      expect(handlers.onMouseDown).toBeDefined();
      expect(hasOffset).toBe(false);
      expect(setOffset).toBeDefined();
    });

    it('calls useSwipeable with events', () => {
      testHook(() => {
        useSwipeOffset();
      });

      expect(hooks.useSwipeable).toHaveBeenCalledWith({
        onSwipedUp: expect.any(Function),
        onSwiping: expect.any(Function),
        trackMouse: true
      });

      const { onSwipedUp, onSwiping } = hooks.useSwipeable.mock.calls[0][0];
      const eventInfo = {
        deltaY: 50,
        dir: 'Up'
      };

      expect(onSwiping(eventInfo)).toBe(false);
      expect(onSwipedUp()).toBe(false);
    });

    it('calls handleSwipe with Down direction', () => {
      let hasOffset;

      testHook(() => {
        [, hasOffset] = useSwipeOffset();
      });

      const { onSwiping } = hooks.useSwipeable.mock.calls[0][0];
      const eventInfo = {
        deltaY: -100,
        dir: 'Down'
      };

      expect(hasOffset).toBe(false);

      act(() => {
        onSwiping(eventInfo);
      });

      expect(hasOffset).toBe(true);
    });

    it('calls handleSwipeUp without offset', () => {
      let hasOffset;

      testHook(() => {
        [, hasOffset] = useSwipeOffset();
      });

      const { onSwipedUp } = hooks.useSwipeable.mock.calls[0][0];

      expect(hasOffset).toEqual(false);

      act(() => {
        onSwipedUp();
      });

      expect(hasOffset).toEqual(false);
    });

    it('calls handleSwipeUp with offset', () => {
      let hasOffset;

      testHook(() => {
        [, hasOffset] = useSwipeOffset(-50);
      });

      expect(hasOffset).toBe(true);

      const { onSwipedUp } = hooks.useSwipeable.mock.calls[0][0];

      act(() => {
        onSwipedUp();
      });

      expect(hasOffset).toBe(false);
    });
  });
});
