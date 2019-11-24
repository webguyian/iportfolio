import React from 'react';
import renderer from 'react-test-renderer';

import Reminder from './Reminder';
import * as hooks from './hooks';

describe('<Reminder />', () => {
  const useSwipeOffsetHook = hooks.useSwipeOffset;

  hooks.useSwipeOffset = jest.fn();

  const timestamp = Number(new Date('2019-10-01T11:11:00'));

  Date.now = jest.fn(() => timestamp);

  const props = {
    id: timestamp,
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
    const component = renderer.create(<Reminder {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with checked prop', () => {
    const component = renderer.create(<Reminder {...props} checked />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with swipe offset', () => {
    hooks.useSwipeOffset.mockReturnValue([{}, 50]);
    const component = renderer.create(<Reminder {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with swipe offset greater than 80', () => {
    hooks.useSwipeOffset.mockReturnValue([{}, 100]);
    const component = renderer.create(<Reminder {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles change function', () => {
    const component = renderer.create(<Reminder {...props} />).root;
    const input = component.find(el => el.props.type === 'text');
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
    const component = renderer.create(<Reminder {...props} />).root;
    const input = component.find(el => el.props.type === 'checkbox');

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
    const component = renderer.create(<Reminder {...props} />).root;
    const form = component.find(el => el.type === 'form');
    const mockEvent = {
      preventDefault: jest.fn()
    };

    expect(props.onAdd).not.toHaveBeenCalled();
    form.props.onSubmit(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(props.onAdd).toHaveBeenCalledWith(component.props.id);
  });
});
