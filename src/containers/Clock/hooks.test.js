import React from 'react';
import { act } from 'react-test-renderer';

import { TestComponent, testHook } from 'utilities/test';
import { initialLaps } from './constants';
import * as hooks from './hooks';

describe('Clock hooks', () => {
  describe('useLaps', () => {
    it('returns lap values', () => {
      const timer = 1000;
      let result;

      testHook(() => {
        result = hooks.useLaps(initialLaps, timer, true);
      });

      const [laps, updateLaps, hasLaps] = result;

      expect(laps).toEqual(initialLaps);
      expect(updateLaps).toBeDefined();
      expect(hasLaps).toBe(false);
    });

    it('updates laps', () => {
      const timer = 1000;
      let result;

      testHook(() => {
        result = hooks.useLaps(initialLaps, timer, true);
      });

      const [laps, updateLaps, hasLaps] = result;

      act(() => {
        updateLaps();
      });
      expect(hasLaps).toBe(true);
      expect(laps).toEqual([timer, ...initialLaps]);
    });

    it('adds new lap', () => {
      const timer = 1000;
      let result;

      testHook(() => {
        result = hooks.useLaps([timer, 900, 800], timer, true);
      });

      const [laps, updateLaps, hasLaps] = result;

      act(() => {
        updateLaps();
      });

      expect(hasLaps).toBe(true);
      expect(laps).toEqual([timer, 900, 800]);
    });

    it('returns initial laps', () => {
      const timer = 1000;
      let result;

      testHook(() => {
        result = hooks.useLaps([timer, 900, 800], timer, false);
      });

      const [laps, updateLaps, hasLaps] = result;

      act(() => {
        updateLaps();
      });

      expect(hasLaps).toBe(true);
      expect(laps).toEqual([timer, 900, 800]);
    });
  });

  describe('useStopwatch', () => {
    it('returns values', () => {
      let result;

      testHook(() => {
        result = hooks.useStopwatch();
      });

      const [timer, timerRunning, toggleTimer, resetTimer] = result;

      expect(timer).toEqual(0);
      expect(timerRunning).toBe(false);
      expect(toggleTimer).toBeDefined();
      expect(resetTimer).toBeDefined();
    });

    it('starts timer', () => {
      jest.useFakeTimers();
      let result;

      const Component = testHook(() => {
        result = hooks.useStopwatch(100, true);
      });

      const [timer, timerRunning, , resetTimer] = result;

      act(() => {
        jest.advanceTimersByTime(10);
        Component.update();
      });

      expect(setInterval).toHaveBeenCalled();
      expect(timer).toEqual(100);
      expect(timerRunning).toBe(true);

      act(() => {
        result = resetTimer();
      });
      expect(result).toEqual(0);
    });

    it('toggles timer', () => {
      jest.useFakeTimers();
      let result;

      const Component = testHook(() => {
        result = hooks.useStopwatch(10, true);
      });

      act(() => {
        const callback = () => {
          result = hooks.useStopwatch();
        };

        Component.update(<TestComponent callback={callback} />);
      });

      const [timer, timerRunning, toggleTimer] = result;

      expect(setInterval).toHaveBeenCalled();
      expect(timer).toEqual(10);
      expect(timerRunning).toBe(true);

      act(() => {
        toggleTimer();
      });

      expect(clearInterval).toHaveBeenCalled();
    });
  });

  describe('useCountdown', () => {
    it('returns countdown values', () => {
      let result;

      testHook(() => {
        result = hooks.useCountdown();
      });

      expect(result).toEqual([
        {
          allSeconds: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        expect.any(Function),
        expect.any(Function)
      ]);
    });

    it('updates countdown values', () => {
      let countdown, setCountdown;

      testHook(() => {
        [countdown, setCountdown] = hooks.useCountdown();
      });

      act(() => {
        setCountdown({ hours: 1, minutes: 20, seconds: 30 });
      });

      expect(countdown).toEqual({
        allSeconds: 4830,
        hours: 1,
        minutes: 20,
        seconds: 30
      });

      act(() => {
        setCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    });

    it('handles subtracting seconds', () => {
      let countdown, setCountdown, startCountdown;
      const timer = {
        hours: 1,
        minutes: 20,
        seconds: 30
      };

      testHook(() => {
        [countdown, setCountdown, startCountdown] = hooks.useCountdown();
      });

      act(() => {
        setCountdown(timer);
      });

      expect(countdown).toEqual({
        ...timer,
        allSeconds: 4830
      });

      act(() => {
        startCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 4829,
        hours: 1,
        minutes: 20,
        seconds: 29
      });
    });

    it('handles subtracting seconds at hour start', () => {
      let countdown, setCountdown, startCountdown;

      testHook(() => {
        [countdown, setCountdown, startCountdown] = hooks.useCountdown();
      });

      act(() => {
        setCountdown({ hours: 1, minutes: 0, seconds: 0 });
      });

      expect(countdown).toEqual({
        allSeconds: 3600,
        hours: 1,
        minutes: 0,
        seconds: 0
      });

      act(() => {
        startCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 3599,
        hours: 0,
        minutes: 59,
        seconds: 59
      });
    });

    it('handles subtracting minutes', () => {
      let countdown, setCountdown, startCountdown;

      testHook(() => {
        [countdown, setCountdown, startCountdown] = hooks.useCountdown();
      });

      act(() => {
        setCountdown({ hours: 1, minutes: 1, seconds: 0 });
      });

      expect(countdown).toEqual({
        allSeconds: 3660,
        hours: 1,
        minutes: 1,
        seconds: 0
      });

      act(() => {
        startCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 3659,
        hours: 1,
        minutes: 0,
        seconds: 59
      });
    });

    it('handles subtracting seconds at 0', () => {
      let countdown, startCountdown;

      testHook(() => {
        [countdown, , startCountdown] = hooks.useCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });

      act(() => {
        startCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 86399,
        hours: 23,
        minutes: 59,
        seconds: 59
      });
    });

    it('handles subtracting seconds at -1', () => {
      let countdown, startCountdown;

      testHook(() => {
        [countdown, , startCountdown] = hooks.useCountdown(0, 0, -1);
      });

      act(() => {
        startCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    });

    it('handles subtracting minutes at -1', () => {
      let countdown, startCountdown;

      testHook(() => {
        [countdown, , startCountdown] = hooks.useCountdown(0, -1, 0);
      });

      act(() => {
        startCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 59,
        hours: 0,
        minutes: 0,
        seconds: 59
      });
    });

    it('handles subtracting hours at -1', () => {
      let countdown, startCountdown;

      testHook(() => {
        [countdown, , startCountdown] = hooks.useCountdown(-1, 0, 0);
      });

      act(() => {
        startCountdown();
      });

      expect(countdown).toEqual({
        allSeconds: 3599,
        hours: 0,
        minutes: 59,
        seconds: 59
      });
    });
  });

  describe('useRadialOffset', () => {
    it('returns initial values', () => {
      const timer = {
        allSeconds: 50,
        duration: 100
      };
      const radius = 175;

      let result;

      testHook(() => {
        result = hooks.useRadialOffset(timer, radius);
      });

      expect(result).toEqual([0, 50]);
    });

    it('returns offset values', () => {
      const timer = {
        allSeconds: 50,
        duration: 100
      };
      const radius = 175;
      let result;

      const Component = testHook(() => {
        result = hooks.useRadialOffset(timer, radius);
      });

      act(() => {
        Component.update();
      });

      expect(result).toEqual([550, 50]);
    });

    it('handles offset matching circumference', () => {
      const timer = {
        allSeconds: 0,
        duration: 100
      };
      const radius = 175;
      let result;

      const Component = testHook(() => {
        result = hooks.useRadialOffset(timer, radius);
      });

      act(() => {
        Component.update();
      });

      expect(result).toEqual([0, 0]);
    });
  });

  describe('useDuration', () => {
    it('returns duration values', () => {
      let result;

      testHook(() => {
        result = hooks.useDuration();
      });

      expect(result).toEqual([
        null,
        expect.any(Function),
        null,
        expect.any(Function)
      ]);
    });

    it('updates duration values', () => {
      let duration, setDuration;

      testHook(() => {
        [duration, setDuration] = hooks.useDuration();
      });

      act(() => {
        setDuration('minutes', 1);
      });

      expect(duration).toEqual(90);
    });
  });

  describe('useStorage', () => {
    it('returns storage value', () => {
      let result;

      const Component = testHook(() => {
        result = hooks.useStorage('test', 100, 'test');
      });

      act(() => {
        Component.update();
      });

      expect(result).toEqual();
    });
  });
});
