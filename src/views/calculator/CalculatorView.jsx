import React from 'react';

import Calculator from 'containers/Calculator/Calculator';

const CalculatorView = props => {
  return (
    <div className="iportfolio-app-view">
      <Calculator {...props} />
    </div>
  );
};

export default CalculatorView;
