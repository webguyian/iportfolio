import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Calculator = React.lazy(() =>
  import(
    /* webpackChunkName: "calculator" */ 'containers/Calculator/Calculator'
  )
);

const CalculatorView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Calculator {...props} />
      </Suspense>
    </div>
  );
};

export default CalculatorView;
