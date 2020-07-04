import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import DeviceFrame from 'components/DeviceFrame/DeviceFrame';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Lockscreen from 'containers/Lockscreen/Lockscreen';

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
        <DateTime />
        <Button icon={icon} onClick={redirect}>
          Unlocked
        </Button>
      </span>
    );
  }

  return 'IMAC';
};

const AppContainer = props => {
  const {
    location: { state }
  } = props;
  const baseClass = 'iportfolio-app';
  const deviceClass = `${baseClass}-device`;
  const themeClass = state && state.theme && `${deviceClass}--${state.theme}`;

  return (
    <div className={baseClass}>
      <DeviceFrame
        className={classNames(deviceClass, themeClass)}
        leftIndicator={<LeftIndicator />}
      >
        <ErrorBoundary>
          <Switch>
            {routes.map(route => (
              <Route key={route.pathKey} exact {...route} />
            ))}
          </Switch>
          <Route path="/" pathKey="lock" exact component={Lockscreen} />
        </ErrorBoundary>
      </DeviceFrame>
    </div>
  );
};

AppContainer.propTypes = {
  location: PropTypes.object.isRequired
};

export default AppContainer;
