import React from 'react';
import { act, create } from 'react-test-renderer';

import RoundedButton from 'components/Button/RoundedButton';
import Stopwatch from './Stopwatch';

import * as hooks from 'modules/clock/hooks';

describe('<Stopwatch />', () => {
  const useLapsHook = hooks.useLaps;
  const useStopwatchHook = hooks.useStopwatch;

  hooks.useLaps = jest.fn();
  hooks.useStopwatch = jest.fn();

  const toggleTimer = jest.fn();
  const resetTimer = jest.fn();
  const updateLaps = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useLaps.mockImplementation(useLapsHook);
    hooks.useStopwatch.mockImplementation(useStopwatchHook);
  });

  it('renders correctly', () => {
    const component = create(<Stopwatch />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with timer', () => {
    hooks.useStopwatch.mockReturnValue([1000, true, toggleTimer, resetTimer]);
    const component = create(<Stopwatch />);

    expect(component).toMatchSnapshot();
  });

  it('handles laps', () => {
    const laps = [1000, 0, 0, 0, 0, 0, 0, 0];

    hooks.useStopwatch.mockReturnValue([1000, true, toggleTimer, resetTimer]);
    hooks.useLaps.mockReturnValue([laps, updateLaps, true]);
    const component = create(<Stopwatch />);
    const buttons = component.root.findAllByType(RoundedButton);

    expect(updateLaps).not.toHaveBeenCalled();

    act(() => {
      const [button] = buttons;

      button.props.onClick();
    });

    expect(updateLaps).toHaveBeenCalled();
  });

  it('handles resetting laps', () => {
    const laps = [1000, 0, 0, 0, 0, 0, 0, 0];

    hooks.useStopwatch.mockReturnValue([1000, false, toggleTimer, resetTimer]);
    hooks.useLaps.mockReturnValue([laps, updateLaps, true]);
    const component = create(<Stopwatch />);
    const buttons = component.root.findAllByType(RoundedButton);

    expect(resetTimer).not.toHaveBeenCalled();

    act(() => {
      const [button] = buttons;

      button.props.onClick();
    });

    expect(resetTimer).toHaveBeenCalled();
  });
});
