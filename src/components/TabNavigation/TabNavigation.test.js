import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import TabNavigation from './TabNavigation';

describe('<TabNavigation />', () => {
  const props = {
    onUpdate: jest.fn(),
    tabs: [
      {
        icon: 'stopwatch',
        label: 'Stopwatch',
        path: '/clock/stopwatch'
      },
      {
        icon: 'clock',
        label: 'Timer',
        path: '/clock/timer'
      }
    ]
  };

  it('renders correctly', () => {
    const component = create(
      <MemoryRouter>
        <TabNavigation {...props} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
