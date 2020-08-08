import React from 'react';
import { render } from '@testing-library/react';

import { initialFilters } from 'modules/camera/constants';
import CameraFilters from './CameraFilters';

describe('<CameraFilters />', () => {
  const props = {
    activeFilter: 'Original',
    filters: { current: initialFilters },
    onFilterClick: jest.fn()
  };

  it('renders correctly', () => {
    const { asFragment } = render(<CameraFilters {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
