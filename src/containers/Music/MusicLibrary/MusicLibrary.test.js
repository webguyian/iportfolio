import React from 'react';
import { act, render } from '@testing-library/react';

import MusicLibrary from './MusicLibrary';

describe('<MusicLibrary />', () => {
  it('renders correctly', async () => {
    let component;

    await act(async () => {
      const result = render(<MusicLibrary />);

      component = result.asFragment();
    });

    expect(component).toMatchSnapshot();
  });
});
