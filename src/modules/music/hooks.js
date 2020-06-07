import { useEffect, useState } from 'react';

import { useFetchAndCache, useStorageCache } from 'modules/browser/hooks';
import { API_MUSIC } from './constants';

export const useMusic = () => {
  const [tracks, setTracks] = useState([]);
  const response = useFetchAndCache(API_MUSIC, 'music', '1D');

  useEffect(() => {
    if (!response || !response.tracks) {
      return;
    }

    setTracks(response.tracks);
  }, [response]);

  return tracks;
};

export const usePlayer = location => {
  const track = location.state && location.state.track;
  const savedTrack = useStorageCache('music-player', track, t => !t);

  return track || savedTrack;
};
