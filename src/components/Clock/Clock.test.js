import React from 'react';
import { create } from 'react-test-renderer';

import Clock from './Clock';

describe('<Clock />', () => {
  it('renders correctly', () => {
    const component = create(<Clock />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
