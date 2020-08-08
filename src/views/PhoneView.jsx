import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Phone = React.lazy(() =>
  import(/* webpackChunkName: "phone" */ 'containers/Phone/Phone')
);

const PhoneView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Phone {...props} />
      </Suspense>
    </div>
  );
};

export default PhoneView;
