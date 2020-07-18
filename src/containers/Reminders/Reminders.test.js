import React from 'react';
import { act, create } from 'react-test-renderer';

import { mockTime } from 'utilities/test';
import Reminder from 'containers/Reminders/Reminder';
import Reminders from './Reminders';

import * as browserHooks from 'modules/browser/hooks';
import * as hooks from 'modules/reminders/hooks';

describe('<Reminders />', () => {
  const useLocalStorageHook = browserHooks.useLocalStorage;
  const useRefFocusHook = browserHooks.useRefFocus;
  const useRemindersHook = hooks.useReminders;

  browserHooks.useLocalStorage = jest.fn();
  browserHooks.useRefFocus = jest.fn();
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
    browserHooks.useLocalStorage.mockImplementation(useLocalStorageHook);
    browserHooks.useRefFocus.mockImplementation(useRefFocusHook);
    hooks.useReminders.mockImplementation(useRemindersHook);
  });

  it('renders correctly', () => {
    const component = create(<Reminders />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles add reminders', () => {
    const component = create(<Reminders />, { createNodeMock });
    const button = component.root.find(el => el.type === 'button');

    expect(browserHooks.useRefFocus).toHaveBeenCalled();
    expect(browserHooks.useLocalStorage).toHaveBeenCalledTimes(1);
    const [emptyReminders] = browserHooks.useLocalStorage.mock.results[0].value;

    expect(emptyReminders).toHaveLength(0);

    act(() => {
      button.props.onClick();
    });

    expect(buttonRef.focus).toHaveBeenCalled();
    expect(browserHooks.useLocalStorage).toHaveBeenCalledTimes(2);

    const [reminders] = browserHooks.useLocalStorage.mock.results[1].value;

    expect(reminders).toHaveLength(1);
    expect(reminders[0]).toEqual({ checked: false, id: mockTime, value: '' });
  });

  it('handles update reminders', () => {
    const component = create(<Reminders />, { createNodeMock });
    const ReminderComponent = component.root.findByType(Reminder);

    const [reminders] = browserHooks.useLocalStorage.mock.results[0].value;

    expect(reminders[0]).toEqual({ checked: false, id: mockTime, value: '' });
    expect(ReminderComponent.props.id).toEqual(mockTime);

    act(() => {
      const updated = { id: mockTime, checked: true, value: 'Add tests' };

      ReminderComponent.props.onUpdate({
        id: 'noMatch',
        checked: false,
        value: ''
      });
      ReminderComponent.props.onUpdate(updated);
    });

    const [
      updatedReminders
    ] = browserHooks.useLocalStorage.mock.results[1].value;

    expect(updatedReminders).toHaveLength(1);
    expect(updatedReminders[0]).toEqual({
      checked: true,
      id: mockTime,
      value: 'Add tests'
    });
  });

  it('handles delete reminders', () => {
    const component = create(<Reminders />, { createNodeMock });
    const ReminderComponent = component.root.findByType(Reminder);

    const [reminders] = browserHooks.useLocalStorage.mock.results[0].value;

    expect(reminders).toHaveLength(1);
    expect(ReminderComponent.props.id).toEqual(mockTime);

    act(() => {
      ReminderComponent.props.onDelete(mockTime);
    });

    const [emptyReminders] = browserHooks.useLocalStorage.mock.results[1].value;

    expect(emptyReminders).toHaveLength(0);
  });
});
