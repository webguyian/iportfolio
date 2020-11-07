import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Settings from './Settings';

describe('<Settings />', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
