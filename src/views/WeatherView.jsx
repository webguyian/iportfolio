import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Weather = React.lazy(() =>
  import(/* webpackChunkName: "weather" */ 'containers/Weather/Weather')
);

const WeatherView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Weather {...props} />
      </Suspense>
    </div>
  );
};

export default WeatherView;
