import React from 'react';
import { render } from '@testing-library/react';
import * as hooks from 'modules/map/hooks';

import Map from './Map';
import MapSearch from './MapSearch/MapSearch';

jest.mock('containers/Map/MapSearch/MapSearch');

MapSearch.mockReturnValue(<div>Map search goes here</div>);

describe('<Map />', () => {
  const useGoogleMaps = hooks.useGoogleMaps;
  const usePlacesSearch = hooks.usePlacesSearch;

  hooks.useGoogleMaps = jest.fn();
  hooks.usePlacesSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useGoogleMaps.mockImplementation(useGoogleMaps);
    hooks.usePlacesSearch.mockImplementation(usePlacesSearch);
  });

  it('renders correctly', () => {
    const { asFragment } = render(<Map />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with saved view', () => {
    hooks.usePlacesSearch.mockReturnValue([
      [],
      jest.fn(),
      jest.fn(),
      {
        map: false,
        saved: true,
        street: false
      }
    ]);
    const { asFragment } = render(<Map />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with street view', () => {
    hooks.usePlacesSearch.mockReturnValue([
      [],
      jest.fn(),
      jest.fn(),
      {
        map: true,
        saved: false,
        street: true
      }
    ]);
    const { asFragment } = render(<Map />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with map', () => {
    hooks.useGoogleMaps.mockReturnValue([React.createRef(), {}]);
    const { asFragment } = render(<Map />);

    expect(asFragment()).toMatchSnapshot();
  });
});
