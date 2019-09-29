import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import DeviceFrame from 'components/DeviceFrame/DeviceFrame';

import routes from 'routes';

class AppContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

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
    const { location } = this.props;
    const unlocked = location.pathname !== '/';

    return (
      <div className="iportfolio-app">
        <DeviceFrame
          className="iportfolio-app-device"
          unlocked={unlocked}
          {...this.props}
        >
          {this.routes}
        </DeviceFrame>
      </div>
    );
  }
}

export default AppContainer;
