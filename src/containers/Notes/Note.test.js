import React from 'react';
import { create } from 'react-test-renderer';

import { mockTime } from 'utilities/test';

import Note from './Note';
import * as hooks from './hooks';

describe('<Note />', () => {
  const useSwipeOffsetHook = hooks.useSwipeOffset;

  hooks.useSwipeOffset = jest.fn();

  const ref = {
    id: 'ref',
    focus: jest.fn()
  };
  const createNodeMock = () => {
    return ref;
  };

  const props = {
    date: mockTime,
    onAdd: jest.fn(),
    onBack: jest.fn(),
    onChange: jest.fn(),
    onDelete: jest.fn(),
    title: 'Example note',
    text: 'This is a note'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useSwipeOffset.mockImplementation(useSwipeOffsetHook);
  });

  it('renders correctly', () => {
    const component = create(<Note {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with swipe offset', () => {
    hooks.useSwipeOffset.mockReturnValue([{}, true]);
    const component = create(<Note {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles title change', () => {
    const component = create(<Note {...props} />).root;
    const input = component.findByType('input');
    const mockEvent = {
      target: {
        value: 'New title'
      }
    };

    expect(props.onChange).not.toHaveBeenCalled();
    input.props.onChange(mockEvent);
    expect(props.onChange).toHaveBeenCalledWith(
      'title',
      mockEvent.target.value
    );
  });

  it('handles text change', () => {
    const component = create(<Note {...props} />).root;
    const input = component.findByType('textarea');
    const mockEvent = {
      target: {
        value: 'New text'
      }
    };

    expect(props.onChange).not.toHaveBeenCalled();
    input.props.onChange(mockEvent);
    expect(props.onChange).toHaveBeenCalledWith('text', mockEvent.target.value);
  });

  it('handles "Enter" keyup', () => {
    const component = create(<Note {...props} />, { createNodeMock }).root;
    const input = component.findByType('input');
    const mockEvent = {
      key: 'Enter'
    };

    expect(ref.focus).not.toHaveBeenCalled();
    input.props.onKeyUp({ key: 'Backspace' });
    expect(ref.focus).not.toHaveBeenCalled();
    input.props.onKeyUp(mockEvent);
    expect(ref.focus).toHaveBeenCalled();
  });
});
