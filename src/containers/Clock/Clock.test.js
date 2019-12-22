import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Clock from './Clock';

describe('<Clock />', () => {
  const props = {
    match: {
      path: '/clock'
    }
  };

  it('renders correctly', () => {
    const component = create(
      <MemoryRouter>
        <Clock {...props} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
