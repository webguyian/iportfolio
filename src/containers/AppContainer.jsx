import React from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import cx from 'classnames';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import DeviceFrame from 'components/DeviceFrame/DeviceFrame';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Lockscreen from 'containers/Lockscreen/Lockscreen';

import { useHomeRedirect } from 'modules/lockscreen/hooks';

import routes from 'routes';

const LeftIndicator = () => {
  const [onClick, pathname, icon] = useHomeRedirect();

  if (pathname !== '/') {
    return (
      <span className="device-time-label">
        <DateTime />
        <Button icon={icon} onClick={onClick}>
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
        className={cx(deviceClass, themeClass)}
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
  location: object.isRequired
};

export default AppContainer;
