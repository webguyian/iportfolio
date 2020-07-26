import React from 'react';
import { act, render } from '@testing-library/react';

import * as hooks from 'modules/music/hooks';
import MusicPlayer from './MusicPlayer';

describe('<MusicPlayer />', () => {
  global.HTMLMediaElement.prototype.load = jest.fn();
  global.HTMLMediaElement.prototype.play = jest.fn();
  global.HTMLMediaElement.prototype.pause = jest.fn();

  const usePlayer = hooks.usePlayer;

  hooks.usePlayer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.usePlayer.mockImplementation(usePlayer);
  });

  const props = {
    location: {}
  };

  const actions = {
    toggle: jest.fn(),
    changeVolume: jest.fn()
  };

  it('renders correctly', async () => {
    let component;

    await act(async () => {
      component = render(<MusicPlayer {...props} />);
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with track', async () => {
    const track = {
      albumId: 'alb.396711596',
      albumName: 'Dance Monkey',
      artistId: 'art.352193935',
      artistName: 'Tones and I',
      disc: 1,
      href: 'https://api.napster.com/v2.2/tracks/tra.396711597',
      id: 'tra.396711597',
      index: 1,
      isrc: 'QZES71982312',
      name: 'Dance Monkey',
      playbackSeconds: 209,
      previewURL: 'https://listen.hs.llnwd.net/g3/9/1/0/8/1/1536018019.mp3',
      shortcut: 'tones-and-i/dance-monkey-single/dance-monkey',
      type: 'track',
      timestamp: 1595086315844
    };

    hooks.usePlayer.mockReturnValueOnce([
      {
        track,
        playing: false,
        ref: jest.fn(),
        volume: 0.2
      },
      actions
    ]);
    const state = { selected: 1 };

    let component;

    await act(async () => {
      component = render(<MusicPlayer location={{ state }} />);
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with track playing', async () => {
    const track = {
      albumId: 'alb.396711596',
      albumName: 'Dance Monkey',
      artistId: 'art.352193935',
      artistName: 'Tones and I',
      name: 'Dance Monkey',
      previewURL: 'https://listen.hs.llnwd.net/g3/9/1/0/8/1/1536018019.mp3'
    };

    hooks.usePlayer.mockReturnValueOnce([
      {
        track,
        playing: true,
        ref: jest.fn(),
        volume: 0.2
      },
      actions
    ]);
    const state = { selected: 1 };

    let component;

    await act(async () => {
      component = render(<MusicPlayer location={{ state }} />);
    });

    expect(component.asFragment()).toMatchSnapshot();
  });
});
