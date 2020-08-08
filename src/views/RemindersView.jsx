import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Reminders = React.lazy(() =>
  import(/* webpackChunkName: "reminders" */ 'containers/Reminders/Reminders')
);

const RemindersView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Reminders {...props} />
      </Suspense>
    </div>
  );
};

export default RemindersView;
