import React from 'react';

import Notes from 'containers/Notes/Notes';

const NotesView = props => {
  return (
    <div className="iportfolio-app-view">
      <Notes {...props} />
    </div>
  );
};

export default NotesView;
