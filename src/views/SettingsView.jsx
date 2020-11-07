import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Settings = React.lazy(() =>
  import(/* webpackChunkName: "settings" */ 'containers/Settings/Settings')
);

const SettingsView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Settings {...props} />
      </Suspense>
    </div>
  );
};

export default SettingsView;
