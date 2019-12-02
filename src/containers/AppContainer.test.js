import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import AppContainer from './AppContainer';

describe('<AppContainer />', () => {
  Date.now = jest.fn(() => new Date('2019-10-01T11:11:00'));
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
