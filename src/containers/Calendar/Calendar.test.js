import React from 'react';
import { act, create } from 'react-test-renderer';

import Calendar from './Calendar';

describe('<Calendar />', () => {
  it('renders correctly', () => {
    const component = create(<Calendar />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with year view', () => {
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
