import React, { Fragment } from 'react';
import { func, object } from 'prop-types';
import cx from 'classnames';
import { Route, Switch } from 'react-router-dom';

import Button from 'components/Button/Button';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

import { useSetting } from 'modules/settings/hooks';

const Setting = props => {
  const { setting, onClick } = props;
  const [backBtnRef, actions, state] = useSetting(setting);
  const baseClass = 'setting';
  const activeClass = state.active ? `${baseClass}--active` : false;
  const backLink = state.active ? `/settings/${setting.id}` : '/settings';
  const backFn = state.active ? () => actions.onNavigate() : onClick;

  return (
    <div className={cx(baseClass, activeClass)}>
      <nav className={`${baseClass}-nav`}>
        <Link back to={backLink} onClick={backFn} ref={backBtnRef} />
      </nav>
      <div className={`${baseClass}-view-container`}>
        <Switch>
          {setting.credit && (
            <Route path={`/settings/${setting.id}/credit`} exact>
              <div className={`${baseClass}-subview`}>
                <pre className={`${baseClass}-credit`}>
                  {setting.credit.description}
                </pre>
              </div>
            </Route>
          )}
          <Route>
            <div className={`${baseClass}-view`}>
              <Text className={`${baseClass}-label`} element="h2">
                {setting.label} Settings
              </Text>
              {!setting.noStorage && (
                <Button
                  className={`${baseClass}-btn`}
                  modifier="anchor-block"
                  onClick={actions.onClearCache}
                  disabled={state.disabled}
                >
                  Clear Storage Cache
                </Button>
              )}
              {setting.credit && (
                <Fragment>
                  <Text element="h3" type="display">
                    Acknowledgements
                  </Text>
                  <Link
                    className={`${baseClass}-item ${baseClass}-item-link`}
                    to={`/settings/${setting.id}/credit`}
                    onClick={actions.onNavigate}
                  >
                    {setting.credit.label}
                  </Link>
                </Fragment>
              )}
              {setting.permissions && (
                <Fragment>
                  <Text element="h3" type="display">
                    Permissions
                  </Text>
                  <Text className={`${baseClass}-item`}>
                    {setting.permissions}
                  </Text>
                </Fragment>
              )}
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

Setting.propTypes = {
  onClick: func.isRequired,
  setting: object.isRequired
};

export default Setting;
