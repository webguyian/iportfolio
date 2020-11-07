import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Setting from './Setting';

describe('<Setting />', () => {
  const props = {
    onClick: jest.fn(),
    setting: {
      icon: 'cameraIcon',
      id: 'camera',
      label: 'Camera',
      noStorage: true,
      permissions: 'Media Devices'
    }
  };

  it('renders correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Setting {...props} />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
