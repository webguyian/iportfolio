import React from 'react';

import Clock from 'containers/Clock/Clock';

const ClockView = props => {
  return (
    <div className="iportfolio-app-view">
      <Clock {...props} />
    </div>
  );
};

export default ClockView;
