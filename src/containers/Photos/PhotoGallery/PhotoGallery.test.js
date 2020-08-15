import React from 'react';
import { render } from '@testing-library/react';

import { mockPhoto } from 'modules/photos/constants';
import * as hooks from 'modules/photos/hooks';

import PhotoGallery from './PhotoGallery';

describe('<PhotoGallery />', () => {
  const props = { location: { pathname: '/photos/gallery' } };
  const usePhotos = hooks.usePhotos;

  hooks.usePhotos = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.usePhotos.mockImplementation(usePhotos);
  });

  it('renders correctly', () => {
    const { asFragment } = render(<PhotoGallery {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with photos', () => {
    const photos = [mockPhoto];

    hooks.usePhotos.mockReturnValueOnce([photos]);
    const { asFragment } = render(<PhotoGallery {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with current photo', () => {
    const photos = [mockPhoto];

    hooks.usePhotos.mockReturnValueOnce([photos]);
    const { asFragment } = render(
      <PhotoGallery location={{ pathname: '/photos/gallery/0' }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
