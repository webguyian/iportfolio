import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Messages = React.lazy(() =>
  import(/* webpackChunkName: "messages" */ 'containers/Messages/Messages')
);

const MessagesView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Messages {...props} />
      </Suspense>
    </div>
  );
};

export default MessagesView;
