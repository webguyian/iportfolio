import React from 'react';
import { render } from '@testing-library/react';

import { mockPhoto } from 'modules/photos/constants';
import * as hooks from 'modules/photos/hooks';

import PhotoView from './PhotoView';

describe('<PhotoView />', () => {
  const props = { photo: mockPhoto };
  const actions = {
    onBack: jest.fn(),
    onCancel: jest.fn(),
    onConfirmDelete: jest.fn(),
    onDelete: jest.fn(),
    onFavorite: jest.fn(),
    onShare: jest.fn()
  };
  const usePhoto = hooks.usePhoto;

  hooks.usePhoto = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.usePhoto.mockImplementation(usePhoto);
  });

  it('renders correctly', () => {
    const { asFragment } = render(<PhotoView {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with photo', () => {
    hooks.usePhoto.mockReturnValue([mockPhoto, actions, false]);
    const { asFragment } = render(<PhotoView {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with unfavorited photo', () => {
    const photo = {
      ...mockPhoto,
      metadata: {
        ...mockPhoto.metadata,
        favorited: false
      }
    };

    hooks.usePhoto.mockReturnValue([photo, actions, false]);
    const { asFragment } = render(<PhotoView {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with controls', () => {
    hooks.usePhoto.mockReturnValue([mockPhoto, actions, true]);
    const { asFragment } = render(<PhotoView {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
