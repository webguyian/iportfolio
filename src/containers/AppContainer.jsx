import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import DeviceFrame from 'components/DeviceFrame/DeviceFrame';

import routes from 'routes';

export class AppContainer extends Component {
  get routes() {
    return (
      <Switch>
        {routes.map(route => (
          <Route key={route.pathKey} exact {...route} />
        ))}
      </Switch>
    );
  }

  render() {
    return (
      <div className="iportfolio-app">
        <DeviceFrame className="iportfolio-app-device" unlocked>
          {this.routes}
        </DeviceFrame>
      </div>
    );
  }
}

export default AppContainer;
