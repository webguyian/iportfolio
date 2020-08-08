import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Mail = React.lazy(() =>
  import(/* webpackChunkName: "mail" */ 'containers/Mail/Mail')
);

const MailView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Mail {...props} />
      </Suspense>
    </div>
  );
};

export default MailView;
