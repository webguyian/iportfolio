import React from 'react';
import { object } from 'prop-types';

import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';

import { ALBUM_URL } from 'modules/music/constants';
import { usePlayer } from 'modules/music/hooks';

const MusicPlayer = props => {
  const { location } = props;
  const track = usePlayer(location);
  const trackName = track ? track.name : 'Not Playing';
  const baseClass = 'music-player';
  const trackClass = `${baseClass}-track`;

  return (
    <div className={baseClass}>
      <div className={`${trackClass}-cover`}>
        {track ? (
          <img
            className={`${trackClass}-cover-image`}
            alt={`${track.albumName} album cover`}
            src={`${ALBUM_URL}/${track.albumId}/images/350x350.jpg`}
          />
        ) : (
          <Icon name="music" size="10x" />
        )}
      </div>
      <div className={`${trackClass}-info`}>
        <Text className={`${trackClass}-name`} element="h1" modifier="bold">
          {trackName}
        </Text>
        <Text className={`${trackClass}-artist`} element="h2">
          {track && track.artistName}
        </Text>
      </div>
      <audio className={`${trackClass}-audio`} controls>
        {track && <source src={track.previewURL} type="audio/mpeg" />}
      </audio>
    </div>
  );
};

MusicPlayer.propTypes = {
  location: object.isRequired
};

export default MusicPlayer;
