import React from 'react';
import { act, create } from 'react-test-renderer';

import { getInitialCalendar } from 'modules/calendar/helpers';
import * as hooks from 'modules/calendar/hooks';
import Calendar from './Calendar';

jest.mock('containers/Calendar/Year/Year', () => 'Year');

describe('<Calendar />', () => {
  const useCalendar = hooks.useCalendar;
  const useGoToToday = hooks.useGoToToday;

  hooks.useCalendar = jest.fn();
  hooks.useGoToToday = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useCalendar.mockImplementation(useCalendar);
    hooks.useGoToToday.mockImplementation(useGoToToday);
  });

  it('renders correctly', () => {
    hooks.useCalendar.mockReturnValue([
      getInitialCalendar(),
      { current: {} },
      2020,
      false
    ]);
    const component = create(<Calendar />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with year view', () => {
    hooks.useGoToToday.mockReturnValue([{ current: {} }, jest.fn()]);
    const component = create(<Calendar />);
    const button = component.root.findByProps({ icon: 'chevron-left' });
    const mockEvent = {
      currentTarget: {
        id: 'goto-2019'
      }
    };

    act(() => {
      button.props.onClick(mockEvent);
    });

    expect(component).toMatchSnapshot();
  });

  it('handles go to today', () => {
    const component = create(<Calendar />);
    const bottomBar = component.root.findByProps({
      className: 'calendar-app-bottom-bar'
    });
    const button = bottomBar.props.children;
    const mockEvent = {
      target: {
        blur: jest.fn()
      }
    };

    expect(button.props.children).toEqual('Today');
    expect(mockEvent.target.blur).not.toHaveBeenCalled();

    act(() => {
      button.props.onClick(mockEvent);
    });

    expect(mockEvent.target.blur).toHaveBeenCalled();
  });
});
