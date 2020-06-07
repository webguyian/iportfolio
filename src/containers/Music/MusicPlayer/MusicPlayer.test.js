import React from 'react';
import { render } from '@testing-library/react';

import MusicPlayer from './MusicPlayer';

describe('<MusicPlayer />', () => {
  const props = {
    location: {}
  };

  it('renders correctly', () => {
    const { asFragment } = render(<MusicPlayer {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with track', () => {
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
    const state = { track };
    const { asFragment } = render(<MusicPlayer location={{ state }} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
