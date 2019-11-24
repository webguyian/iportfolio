import React, { useState } from 'react';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import Reminder from './Reminder';
import { useLocalStorage, useRefFocus, useReminders } from './hooks';

const Reminders = () => {
  const baseClass = 'reminders-app';
  const [reminders, setReminders] = useLocalStorage('reminders', []);
  const [focusedInput, setFocusedInput] = useState(null);
  const button = useRefFocus();

  useReminders(reminders, setReminders);

  const addReminder = () => {
    const id = Date.now();

    setReminders(() => reminders.concat([{ id, checked: false, value: '' }]));
    setFocusedInput(id);
  };

  const deleteReminder = id => {
    setReminders(() => reminders.filter(r => r.id !== id));
    setFocusedInput(null);
  };

  const updateReminder = updated => {
    const updatedReminders = reminders.map(reminder => {
      if (reminder.id === updated.id) {
        return {
          ...reminder,
          ...updated
        };
      }

      return reminder;
    });

    setReminders(() => updatedReminders);
  };

  return (
    <div className={baseClass}>
      <Text element="h1" type="display">
        Reminders
      </Text>
      {reminders.length ? (
        <div className={`${baseClass}-list`}>
          {reminders.map(reminder => (
            <Reminder
              key={reminder.id}
              focused={focusedInput === reminder.id}
              onAdd={addReminder}
              onDelete={deleteReminder}
              onUpdate={updateReminder}
              {...reminder}
            />
          ))}
        </div>
      ) : null}
      {!reminders.length && <Text element="p">No Reminders</Text>}
      <Button icon="plus-circle" withLabel onClick={addReminder} ref={button}>
        New Reminder
      </Button>
    </div>
  );
};

export default Reminders;
