import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Calendar = React.lazy(() =>
  import(/* webpackChunkName: "calendar" */ 'containers/Calendar/Calendar')
);

const CalendarView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Calendar {...props} />
      </Suspense>
    </div>
  );
};

export default CalendarView;
