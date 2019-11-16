import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import AppContainer from 'containers/AppContainer';

const App = () => {
  return <Route component={AppContainer} />;
};

export default hot(App);
