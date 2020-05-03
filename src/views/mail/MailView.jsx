import React from 'react';

import Mail from 'containers/Mail/Mail';

const MailView = props => {
  return (
    <div className="iportfolio-app-view">
      <Mail {...props} />
    </div>
  );
};

export default MailView;
