import React from 'react';
import { object } from 'prop-types';

import TabNavigation from 'components/TabNavigation/TabNavigation';
import MusicLibrary from './MusicLibrary/MusicLibrary';
import MusicPlayer from './MusicPlayer/MusicPlayer';

import { useInitialRoute } from 'modules/browser/hooks';

const Music = props => {
  const { match } = props;
  const baseClass = 'music-app';
  const tabs = [
    {
      path: `${match.path}/library`,
      icon: 'music',
      label: 'Library',
      component: MusicLibrary
    },
    {
      path: `${match.path}/player`,
      icon: 'play-circle',
      label: 'Player',
      component: MusicPlayer
    }
  ];

  useInitialRoute(match, tabs[0].path);

  return (
    <div className={baseClass}>
      <TabNavigation tabs={tabs} />
    </div>
  );
};

Music.propTypes = {
  match: object.isRequired
};

export default Music;
