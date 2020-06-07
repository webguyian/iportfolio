import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Music from './Music';

describe('<Music />', () => {
  const props = {
    match: {
      path: '/music'
    }
  };

  it('renders correctly', () => {
    const component = render(
      <MemoryRouter>
        <Music {...props} />
      </MemoryRouter>
    );

    expect(component.asFragment()).toMatchSnapshot();
  });
});
