import React from 'react';
import { render } from '@testing-library/react';

import WeatherList from './WeatherList';

describe('<WeatherList />', () => {
  it('renders correctly', async () => {
    const { asFragment, findByText } = render(<WeatherList />);

    await findByText('Austin');

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with current city', async () => {
    const current = {
      city: 'New York City',
      currently: {
        temperature: 43
      }
    };

    const { asFragment, findByText } = render(
      <WeatherList current={current} />
    );

    await findByText('New York City');

    expect(asFragment()).toMatchSnapshot();
  });
});
