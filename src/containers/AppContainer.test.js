import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import AppContainer from './AppContainer';

describe('<AppContainer />', () => {
  it('renders correctly', () => {
    const component = create(
      <MemoryRouter>
        <AppContainer />
      </MemoryRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
