import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Homescreen from './Homescreen';

describe('<Homescreen />', () => {
  it('renders correctly', () => {
    const component = create(
      <MemoryRouter>
        <Homescreen />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
