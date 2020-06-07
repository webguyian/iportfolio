import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Music = React.lazy(() =>
  import(/* webpackChunkName: "music" */ 'containers/Music/Music')
);

const MusicView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Music {...props} />
      </Suspense>
    </div>
  );
};

export default MusicView;
