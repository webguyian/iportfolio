import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Map = React.lazy(() =>
  import(/* webpackChunkName: "map" */ 'containers/Map/Map')
);

const MapView = props => {
  return (
    <div className="iportfolio-app-view iportfolio-app-view--no-padding">
      <Suspense fallback={<Loading />}>
        <Map {...props} />
      </Suspense>
    </div>
  );
};

export default MapView;
