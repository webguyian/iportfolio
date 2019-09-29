import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import AppContainer from 'containers/AppContainer';

class App extends Component {
  render() {
    return <Route component={AppContainer} />;
  }
}

export default hot(App);
