import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Photos = React.lazy(() =>
  import(/* webpackChunkName: "photos" */ 'containers/Photos/Photos')
);

const PhotosView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Photos {...props} />
      </Suspense>
    </div>
  );
};

export default PhotosView;
