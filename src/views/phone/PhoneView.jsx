import React from 'react';

import Phone from 'containers/Phone/Phone';

const PhoneView = props => {
  return (
    <div className="iportfolio-app-view">
      <Phone {...props} />
    </div>
  );
};

export default PhoneView;
