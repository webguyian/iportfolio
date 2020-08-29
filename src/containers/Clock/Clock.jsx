import React from 'react';
import { object } from 'prop-types';

import TabNavigation from 'components/TabNavigation/TabNavigation';
import Stopwatch from 'containers/Clock/Stopwatch/Stopwatch';
import Timer from 'containers/Clock/Timer/Timer';

import { useInitialRoute } from 'modules/browser/hooks';

const Clock = props => {
  const { match } = props;
  const baseClass = 'clock-app';
  const tabs = [
    {
      component: Stopwatch,
      icon: 'stopwatch',
      label: 'Stopwatch',
      path: `${match.path}/stopwatch`
    },
    {
      component: Timer,
      icon: 'clock',
      label: 'Timer',
      path: `${match.path}/timer`
    }
  ];

  useInitialRoute(match, tabs[0].path);

  return (
    <div className={baseClass}>
      <TabNavigation tabs={tabs} />
    </div>
  );
};

Clock.propTypes = {
  match: object.isRequired
};

export default Clock;
