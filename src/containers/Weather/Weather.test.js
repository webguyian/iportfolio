import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Weather from './Weather';

describe('<Weather />', () => {
  it('renders correctly', () => {
    const component = create(
      <MemoryRouter>
        <Weather />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
