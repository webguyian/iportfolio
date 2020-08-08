import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Camera = React.lazy(() =>
  import(/* webpackChunkName: "camera" */ 'containers/Camera/Camera')
);

const CameraView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Camera {...props} />
      </Suspense>
    </div>
  );
};

export default CameraView;
