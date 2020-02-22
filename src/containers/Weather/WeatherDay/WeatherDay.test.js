import React from 'react';
import { create } from 'react-test-renderer';

import WeatherDay from './WeatherDay';

describe('<WeatherDay />', () => {
  const props = {
    icon: 'clear-day',
    temperatureHigh: 69.41,
    temperatureLow: 51.43,
    time: 1583726400
  };

  it('renders correctly', () => {
    const component = create(<WeatherDay {...props} />);

    expect(component).toMatchSnapshot();
  });
});
