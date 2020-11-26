import React from 'react';
import classNames from 'classnames';
import { Route, Switch } from 'react-router-dom';

import AppIcon from 'components/AppIcon/AppIcon';
import Avatar from 'components/Avatar/Avatar';
import Link from 'components/Link/Link';
import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';
import ToggleCheckbox from 'components/ToggleCheckbox/ToggleCheckbox';

import * as icons from 'modules/homescreen/constants';
import { appSettings, settings } from 'modules/settings/constants';
import { useSettings } from 'modules/settings/hooks';
import Setting from './Setting';

const Settings = () => {
  const [state, scrollRef, handleClick] = useSettings();
  const baseClass = 'settings-app';
  const featuredItemClass = `${baseClass}-featured-item`;
  const listClass = `${baseClass}-list`;
  const activeClass = state.active ? `${baseClass}-body--active` : false;
  const scrolledClass = state.scrolled ? `${baseClass}--scrolled` : false;

  return (
    <div className={classNames(baseClass, scrolledClass)}>
      <Text element="h1" type="display">
        Settings
      </Text>
      <Text element="h1">Settings</Text>
      <div
        className={classNames(`${baseClass}-body`, activeClass)}
        ref={scrollRef}
      >
        <div className={`${listClass}-container`}>
          <div className={featuredItemClass}>
            <Avatar
              alt="Photo of Ian Mac"
              src="https://github.com/webguyian.png?size=55"
            />
            <div className={`${featuredItemClass}-content`}>
              <Text
                className={`${featuredItemClass}-content-name`}
                element="h2"
              >
                Ian Mac
              </Text>
              <Text element="p">Web Developer</Text>
            </div>
          </div>
          <ul className={classNames(listClass, `${listClass}--general`)}>
            {settings.map(setting => (
              <li key={setting.id} className={`${listClass}-item`}>
                <AppIcon
                  name={setting.label}
                  color={setting.color}
                  noLabel
                  noLink
                >
                  {setting.component ? (
                    setting.component()
                  ) : (
                    <Icon name={setting.icon} label={setting.label} />
                  )}
                </AppIcon>
                <Text className={`${listClass}-item-label`}>
                  {setting.label}
                  <ToggleCheckbox
                    checked={setting.enabled}
                    disabled={setting.disabled}
                  />
                </Text>
              </li>
            ))}
          </ul>
          <ul className={listClass}>
            {appSettings.map(setting => (
              <li key={setting.id}>
                <Link
                  className={`${listClass}-item ${listClass}-item-link`}
                  to={`/settings/${setting.id}`}
                  onClick={handleClick.bind(null, setting.id)}
                >
                  <AppIcon name={setting.label} noLabel noLink>
                    {icons[setting.icon] && icons[setting.icon]()}
                  </AppIcon>
                  <Text className={`${listClass}-item-label`}>
                    {setting.label}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${baseClass}-subview`}>
          <Switch>
            {appSettings.map(setting => (
              <Route
                key={setting.id}
                path={`/settings/${setting.id}`}
                render={() => (
                  <Setting setting={setting} onClick={handleClick} />
                )}
              />
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Settings;