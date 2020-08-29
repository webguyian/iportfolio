import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Safari = React.lazy(() =>
  import(/* webpackChunkName: "safari" */ 'containers/Safari/Safari')
);

const SafariView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Safari {...props} />
      </Suspense>
    </div>
  );
};

export default SafariView;
