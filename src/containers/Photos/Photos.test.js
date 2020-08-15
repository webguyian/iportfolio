import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Photos, { FavoritesGallery } from './Photos';

describe('<Photos />', () => {
  const props = {
    location: {
      pathname: '/photos'
    },
    match: {
      path: '/photos'
    }
  };

  it('renders correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Photos {...props} />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders FavoritesGallery', () => {
    const { asFragment } = render(<FavoritesGallery {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
