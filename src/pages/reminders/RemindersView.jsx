import React from 'react';

import Reminders from 'containers/Reminders/Reminders';

const RemindersView = props => {
  return (
    <div className="iportfolio-app-view">
      <Reminders {...props} />
    </div>
  );
};

export default RemindersView;
