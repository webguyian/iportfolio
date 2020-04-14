import React from 'react';

import Calendar from 'containers/Calendar/Calendar';

const CalendarView = props => {
  return (
    <div className="iportfolio-app-view">
      <Calendar {...props} />
    </div>
  );
};

export default CalendarView;
