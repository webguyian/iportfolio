import React from 'react';
import { create } from 'react-test-renderer';

import WeatherList from './WeatherList';

describe('<WeatherList />', () => {
  // Override prop error
  console.error = jest.fn();

  it('renders correctly', () => {
    const component = create(<WeatherList />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with current city', () => {
    const current = {
      city: 'New York City',
      currently: {
        temperature: 43
      }
    };
    const component = create(<WeatherList current={current} />);

    expect(component).toMatchSnapshot();
  });
});
