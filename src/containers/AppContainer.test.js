import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import AppContainer from './AppContainer';

describe('<AppContainer />', () => {
  const timestamp = Number(new Date('2019-10-01T11:11:00'));

  Date.now = jest.fn(() => timestamp);
  window.matchMedia = jest.fn().mockImplementation(media => {
    return {
      matches: false,
      media
    };
  });

  it('renders correctly', () => {
    const component = renderer.create(
      <MemoryRouter>
        <AppContainer />
      </MemoryRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
