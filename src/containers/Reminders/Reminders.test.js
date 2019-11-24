import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Reminder from 'containers/Reminders/Reminder';
import Reminders from './Reminders';

import * as hooks from './hooks';

describe('<Reminders />', () => {
  const timestamp = Number(new Date('2019-10-01T11:11:00'));

  Date.now = jest.fn(() => timestamp);

  const useLocalStorageHook = hooks.useLocalStorage;
  const useRefFocusHook = hooks.useRefFocus;
  const useRemindersHook = hooks.useReminders;

  hooks.useLocalStorage = jest.fn();
  hooks.useRefFocus = jest.fn();
  hooks.useReminders = jest.fn();

  const buttonRef = {
    focus: jest.fn()
  };

  const createNodeMock = element => {
    return element.type === 'button' ? buttonRef : null;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useLocalStorage.mockImplementation(useLocalStorageHook);
    hooks.useRefFocus.mockImplementation(useRefFocusHook);
    hooks.useReminders.mockImplementation(useRemindersHook);
  });

  it('renders correctly', () => {
    const component = renderer.create(<Reminders />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles add reminders', () => {
    const component = renderer.create(<Reminders />, { createNodeMock });
    const button = component.root.find(el => el.type === 'button');

    expect(hooks.useRefFocus).toHaveBeenCalled();
    expect(hooks.useLocalStorage).toHaveBeenCalledTimes(1);
    const [emptyReminders] = hooks.useLocalStorage.mock.results[0].value;

    expect(emptyReminders).toHaveLength(0);

    act(() => {
      button.props.onClick();
    });

    expect(buttonRef.focus).toHaveBeenCalled();
    expect(hooks.useLocalStorage).toHaveBeenCalledTimes(2);

    const [reminders] = hooks.useLocalStorage.mock.results[1].value;

    expect(reminders).toHaveLength(1);
    expect(reminders[0]).toEqual({ checked: false, id: timestamp, value: '' });
  });

  it('handles update reminders', () => {
    const component = renderer.create(<Reminders />, { createNodeMock });
    const ReminderComponent = component.root.findByType(Reminder);

    const [reminders] = hooks.useLocalStorage.mock.results[0].value;

    expect(reminders[0]).toEqual({ checked: false, id: timestamp, value: '' });
    expect(ReminderComponent.props.id).toEqual(timestamp);

    act(() => {
      const updated = { id: timestamp, checked: true, value: 'Add tests' };

      ReminderComponent.props.onUpdate({
        id: 'noMatch',
        checked: false,
        value: ''
      });
      ReminderComponent.props.onUpdate(updated);
    });

    const [updatedReminders] = hooks.useLocalStorage.mock.results[1].value;

    expect(updatedReminders).toHaveLength(1);
    expect(updatedReminders[0]).toEqual({
      checked: true,
      id: timestamp,
      value: 'Add tests'
    });
  });

  it('handles delete reminders', () => {
    const component = renderer.create(<Reminders />, { createNodeMock });
    const ReminderComponent = component.root.findByType(Reminder);

    const [reminders] = hooks.useLocalStorage.mock.results[0].value;

    expect(reminders).toHaveLength(1);
    expect(ReminderComponent.props.id).toEqual(timestamp);

    act(() => {
      ReminderComponent.props.onDelete(timestamp);
    });

    const [emptyReminders] = hooks.useLocalStorage.mock.results[1].value;

    expect(emptyReminders).toHaveLength(0);
  });
});
