import React from 'react';

import Stocks from 'containers/Stocks/Stocks';

const StocksView = props => {
  return (
    <div className="iportfolio-app-view">
      <Stocks {...props} />
    </div>
  );
};

export default StocksView;
