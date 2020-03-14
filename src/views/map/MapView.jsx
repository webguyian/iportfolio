import React from 'react';

import Map from 'containers/Map/Map';

const MapView = props => {
  return (
    <div className="iportfolio-app-view iportfolio-app-view--no-padding">
      <Map {...props} />
    </div>
  );
};

export default MapView;
