import React from 'react';
import { create } from 'react-test-renderer';

import WeatherHour from './WeatherHour';

describe('<WeatherHour />', () => {
  const props = {
    icon: 'clear-day',
    temprature: 69.41,
    time: 1583726400
  };

  it('renders correctly', () => {
    const component = create(<WeatherHour {...props} />);

    expect(component).toMatchSnapshot();
  });
});
