import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Stocks = React.lazy(() =>
  import(/* webpackChunkName: "stocks" */ 'containers/Stocks/Stocks')
);

const StocksView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Stocks {...props} />
      </Suspense>
    </div>
  );
};

export default StocksView;
