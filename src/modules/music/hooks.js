import { useEffect, useRef, useState } from 'react';

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
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const [volume, setVolume] = useState(0.2);
  const tracks = useMusic();
  const savedTrack = useStorageCache('music-player', track, t => !t);
  const audioRef = useRef();
  const player = {
    playing,
    volume,
    ref: audioRef,
    track: track || savedTrack
  };
  const actions = {
    prev: () => {
      const index = tracks.indexOf(track);
      const prev = index === 0 ? tracks.length - 1 : index - 1;

      setPlaying(false);
      setTrack(tracks[prev]);
    },
    next: () => {
      const index = tracks.indexOf(track);
      const next = index === tracks.length - 1 ? 0 : index + 1;

      setPlaying(false);
      setTrack(tracks[next]);
    },
    toggle: () => setPlaying(play => !play),
    changeVolume: event => {
      const value = Number(event.target.value);

      setVolume(value);
    }
  };

  const handleEnd = () => {
    setPlaying(false);
  };

  useEffect(() => {
    if (!tracks || !tracks.length) {
      // Exit early
      return;
    }

    const selected = location.state && location.state.selected;

    if (typeof selected !== 'undefined') {
      setTrack(tracks[selected]);
    }
  }, [tracks, location.state]);

  useEffect(() => {
    if (!audioRef.current) {
      // Exit early
      return;
    }

    audioRef.current.addEventListener('ended', handleEnd);
  }, [audioRef.current]);

  useEffect(() => {
    if (!audioRef.current) {
      // Exit early
      return;
    }

    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioRef.current, playing]);

  useEffect(() => {
    if (!audioRef.current) {
      // Exit early
      return;
    }

    audioRef.current.volume = volume;
  }, [audioRef.current, volume]);

  useEffect(() => {
    if (!audioRef.current) {
      // Exit early
      return;
    }

    audioRef.current.load();
  }, [track]);

  return [player, actions];
};
