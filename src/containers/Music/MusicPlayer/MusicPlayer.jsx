import React from 'react';
import { object } from 'prop-types';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';

import { ALBUM_URL } from 'modules/music/constants';
import { usePlayer } from 'modules/music/hooks';

const MusicPlayer = props => {
  const { location } = props;
  const [player, actions] = usePlayer(location);
  const { ref, track } = player;
  const trackName = track ? track.name : 'Not Playing';
  const baseClass = 'music-player';
  const controlClass = `${baseClass}-control`;
  const playClass = `${controlClass} ${controlClass}--play`;
  const trackClass = `${baseClass}-track`;
  const volumeClass = `${baseClass}-volume-control`;

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
      <audio className={`${trackClass}-audio`} ref={ref}>
        {track && <source src={track.previewURL} type="audio/mpeg" />}
      </audio>
      <div className={`${baseClass}-controls`}>
        <Button
          className={controlClass}
          icon="fast-backward"
          size="3x"
          onClick={actions.prev}
        >
          Previous track
        </Button>
        {player.playing ? (
          <Button
            className={playClass}
            icon="pause"
            size="4x"
            onClick={actions.toggle}
          >
            Pause
          </Button>
        ) : (
          <Button
            className={playClass}
            icon="play"
            size="4x"
            onClick={actions.toggle}
          >
            Play
          </Button>
        )}
        <Button
          className={controlClass}
          icon="fast-forward"
          size="3x"
          onClick={actions.next}
        >
          Next track
        </Button>
      </div>
      <div className={volumeClass}>
        <Icon name="volume-off" label="Volume off" />
        <input
          className={`${volumeClass}-slider`}
          type="range"
          min="0"
          max="1"
          step="0.1"
          onChange={actions.changeVolume}
          value={player.volume}
        />
        <Icon name="volume-up" label="Volume up" />
      </div>
    </div>
  );
};

MusicPlayer.propTypes = {
  location: object.isRequired
};

export default MusicPlayer;
