import React from 'react';
import { create } from 'react-test-renderer';

import WeatherIcons from './WeatherIcons';

describe('<WeatherIcons />', () => {
  it('renders correctly', () => {
    const component = create(<WeatherIcons />);

    expect(component).toMatchSnapshot();
  });
});
