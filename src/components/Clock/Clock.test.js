import React from 'react';
import { create } from 'react-test-renderer';

import Clock from './Clock';

describe('<Clock />', () => {
  const timestamp = Number(new Date('2019-10-01T11:11:00'));

  Date.now = jest.fn(() => timestamp);

  it('renders correctly', () => {
    const component = create(<Clock />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
