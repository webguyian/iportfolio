import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import DeviceFrame from 'components/DeviceFrame/DeviceFrame';

import routes from 'routes';

const LeftIndicator = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const home = 'home';
  const homeRoute = `/${home}`;
  const icon = pathname === homeRoute ? 'lock-open' : home;

  const redirect = () => {
    const route = icon === home ? homeRoute : '/';

    history.push(route);
  };

  if (pathname !== '/') {
    return (
      <span className="device-time-label">
        <DateTime format="h:mm" />
        <Button icon={icon} onClick={redirect}>
          Unlocked
        </Button>
      </span>
    );
  }

  return 'IMAC';
};

const AppContainer = () => {
  return (
    <div className="iportfolio-app">
      <DeviceFrame
        className="iportfolio-app-device"
        leftIndicator={<LeftIndicator />}
      >
        <Switch>
          {routes.map(route => (
            <Route key={route.pathKey} exact {...route} />
          ))}
        </Switch>
      </DeviceFrame>
    </div>
  );
};

export default AppContainer;
