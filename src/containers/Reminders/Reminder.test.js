import React from 'react';
import { create } from 'react-test-renderer';

import { mockTime } from 'utilities/test';

import Reminder from './Reminder';
import * as hooks from 'modules/reminders/hooks';

describe('<Reminder />', () => {
  const useSwipeOffsetHook = hooks.useSwipeOffset;

  hooks.useSwipeOffset = jest.fn();

  const props = {
    id: mockTime,
    onAdd: jest.fn(),
    onDelete: jest.fn(),
    onUpdate: jest.fn(),
    value: 'Add tests'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useSwipeOffset.mockImplementation(useSwipeOffsetHook);
  });

  it('renders correctly', () => {
    const component = create(<Reminder {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with checked prop', () => {
    const component = create(<Reminder {...props} checked />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with swipe offset', () => {
    hooks.useSwipeOffset.mockReturnValue([{}, 50]);
    const component = create(<Reminder {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with swipe offset greater than 80', () => {
    hooks.useSwipeOffset.mockReturnValue([{}, 100]);
    const component = create(<Reminder {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles change function', () => {
    const component = create(<Reminder {...props} />).root;
    const input = component.findByProps({ type: 'text' });
    const mockEvent = {
      target: {
        value: 'Validate tests'
      }
    };

    expect(props.onUpdate).not.toHaveBeenCalled();
    input.props.onChange(mockEvent);
    expect(props.onUpdate).toHaveBeenCalledWith({
      checked: false,
      id: component.props.id,
      value: mockEvent.target.value
    });
  });

  it('handles check function', () => {
    const component = create(<Reminder {...props} />).root;
    const input = component.findByProps({ type: 'checkbox' });

    props.onUpdate.mockClear();

    expect(props.onUpdate).not.toHaveBeenCalled();
    input.props.onChange();
    expect(props.onUpdate).toHaveBeenCalledWith({
      checked: true,
      id: component.props.id,
      value: 'Add tests'
    });
  });

  it('handles submit function', () => {
    const component = create(<Reminder {...props} />).root;
    const form = component.find(el => el.type === 'form');
    const mockEvent = {
      preventDefault: jest.fn()
    };

    expect(props.onAdd).not.toHaveBeenCalled();
    form.props.onSubmit(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(props.onAdd).toHaveBeenCalled();
  });
});
