import React, { Fragment } from 'react';
import { array, bool } from 'prop-types';
import classNames from 'classnames';
import { NavLink, Route } from 'react-router-dom';

import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';

const TabNavigation = props => {
  const { showNav, tabs } = props;
  const baseClass = 'ui-tab-navigation';
  const linkClass = `${baseClass}-link`;
  const activeClass = `${linkClass}--active`;
  const labelClass = `${linkClass}-label`;

  return (
    <Fragment>
      {tabs.map(tab =>
        tab.component ? (
          <Route key={tab.icon} path={tab.path} component={tab.component} />
        ) : null
      )}
      {showNav && (
        <nav className={baseClass}>
          <ul className={`${baseClass}-list`}>
            {tabs.map(tab => (
              <li key={tab.icon} className={`${baseClass}-list-item`}>
                <NavLink
                  className={classNames(linkClass, 'ui-link')}
                  activeClassName={activeClass}
                  to={tab.path}
                >
                  <Icon name={tab.icon} size="3x" />
                  <Text className={labelClass}>{tab.label}</Text>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </Fragment>
  );
};

TabNavigation.propTypes = {
  showNav: bool,
  tabs: array.isRequired
};

TabNavigation.defaultProps = {
  showNav: true
};

export default TabNavigation;
