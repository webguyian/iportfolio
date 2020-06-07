import React from 'react';

import Link from 'components/Link/Link';
import Loading from 'components/Loading/Loading';
import Text from 'components/Text/Text';

import { ALBUM_URL } from 'modules/music/constants';
import { useMusic } from 'modules/music/hooks';

const MusicLibrary = () => {
  const tracks = useMusic();
  const baseClass = 'music-library';
  const trackClass = `${baseClass}-track`;

  return (
    <div className={baseClass}>
      <Text className={`${baseClass}-title`} element="h1" type="display">
        Library
      </Text>
      <Text className={`${baseClass}-subtitle`} element="h2" type="display">
        Recently Added
      </Text>
      {tracks.length ? (
        <ul className={`${baseClass}-tracks`}>
          {tracks.map(track => (
            <li key={track.id}>
              <div className={trackClass}>
                <Link to="/music/player" state={{ track }}>
                  <img
                    className={`${trackClass}-cover`}
                    alt={`${track.albumName} album cover`}
                    src={`${ALBUM_URL}/${track.albumId}/images/160x160.jpg`}
                  />
                </Link>
                <Text className={`${trackClass}-name`} element="h3">
                  {track.name}
                </Text>
                <Text className={`${trackClass}-artist`} element="h4">
                  {track.artistName}
                </Text>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Loading label="Loading tracks..." />
      )}
    </div>
  );
};

export default MusicLibrary;
