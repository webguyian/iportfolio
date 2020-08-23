import React from 'react';
import { act, create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import AppContainer from './AppContainer';

describe('<AppContainer />', () => {
  const props = {
    location: {
      pathname: '/'
    }
  };

  it('renders correctly', async () => {
    let component;

    await act(async () => {
      component = create(
        <MemoryRouter>
          <AppContainer {...props} />
        </MemoryRouter>
      );
    });

    expect(component).toMatchSnapshot();
  });
});
