import React, { Suspense } from 'react';

import Loading from 'components/Loading/Loading';

const Notes = React.lazy(() =>
  import(/* webpackChunkName: "notes" */ 'containers/Notes/Notes')
);

const NotesView = props => {
  return (
    <div className="iportfolio-app-view">
      <Suspense fallback={<Loading />}>
        <Notes {...props} />
      </Suspense>
    </div>
  );
};

export default NotesView;
