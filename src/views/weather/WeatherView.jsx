import React from 'react';

import Weather from 'containers/Weather/Weather';

const WeatherView = props => {
  return (
    <div className="iportfolio-app-view">
      <Weather {...props} />
    </div>
  );
};

export default WeatherView;
