import React from 'react';
import { act, render } from '@testing-library/react';

import * as hooks from 'modules/music/hooks';
import MusicLibrary from './MusicLibrary';

jest.mock('components/Link/Link', () => 'mock-link');

describe('<MusicLibrary />', () => {
  const useMusic = hooks.useMusic;

  hooks.useMusic = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useMusic.mockImplementation(useMusic);
  });

  it('renders correctly', async () => {
    let component;

    await act(async () => {
      const result = render(<MusicLibrary />);

      component = result.asFragment();
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with tracks', async () => {
    const track = {
      albumId: 'alb.396711596',
      albumName: 'Dance Monkey',
      artistId: 'art.352193935',
      artistName: 'Tones and I',
      id: 'tra.396711597',
      name: 'Dance Monkey',
      previewURL: 'https://listen.hs.llnwd.net/g3/9/1/0/8/1/1536018019.mp3'
    };

    hooks.useMusic.mockReturnValueOnce([track]);

    let component;

    await act(async () => {
      const result = render(<MusicLibrary />);

      component = result.asFragment();
    });

    expect(component).toMatchSnapshot();
  });
});
