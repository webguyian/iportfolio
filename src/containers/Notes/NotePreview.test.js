import React from 'react';
import { create } from 'react-test-renderer';

import { mockTime } from 'utilities/test';

import NotePreview from './NotePreview';
import * as hooks from 'modules/reminders/hooks';

describe('<NotePreview />', () => {
  const useSwipeOffsetHook = hooks.useSwipeOffset;

  hooks.useSwipeOffset = jest.fn();

  const props = {
    note: {
      id: mockTime.toString(36),
      date: mockTime,
      title: 'Hello',
      text: 'This is a note'
    },
    onClick: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useSwipeOffset.mockImplementation(useSwipeOffsetHook);
  });

  it('renders correctly', () => {
    const component = create(<NotePreview {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without title or text', () => {
    const updatedNote = {
      ...props.note,
      title: undefined,
      text: undefined
    };
    const component = create(<NotePreview {...props} note={updatedNote} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with swipe offset', () => {
    hooks.useSwipeOffset.mockReturnValue([{}, 50]);
    const component = create(<NotePreview {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with swipe offset greater than 80', () => {
    hooks.useSwipeOffset.mockReturnValue([{}, 100]);
    const component = create(<NotePreview {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles click function', () => {
    const component = create(<NotePreview {...props} />).root;
    const [link] = component.findAllByType('mock-link');

    expect(props.onClick).not.toHaveBeenCalled();
    link.props.onClick();
    expect(props.onClick).toHaveBeenCalledWith(props.note);
  });

  it('handles click function with offset', () => {
    hooks.useSwipeOffset.mockReturnValue([{}, 50]);
    const component = create(<NotePreview {...props} />).root;
    const [link] = component.findAllByType('mock-link');

    expect(props.onClick).not.toHaveBeenCalled();
    const value = link.props.onClick();

    expect(props.onClick).not.toHaveBeenCalled();
    expect(value).toBe(false);
  });
});
