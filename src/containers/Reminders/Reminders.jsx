import React from 'react';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import Reminder from './Reminder';

import { useRefFocus } from 'modules/browser/hooks';
import { useReminders } from 'modules/reminders/hooks';

const Reminders = () => {
  const [reminders, focusedInput, actions] = useReminders();
  const button = useRefFocus();
  const baseClass = 'reminders-app';

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
              onAdd={actions.add}
              onDelete={actions.remove}
              onUpdate={actions.update}
              {...reminder}
            />
          ))}
        </div>
      ) : null}
      {!reminders.length && <Text element="p">No Reminders</Text>}
      <Button icon="plus-circle" withLabel onClick={actions.add} ref={button}>
        New Reminder
      </Button>
    </div>
  );
};

export default Reminders;
