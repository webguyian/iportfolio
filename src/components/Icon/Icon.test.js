import React from 'react';
import { create } from 'react-test-renderer';

import Icon from './Icon';

describe('<Icon />', () => {
  it('renders correctly', () => {
    const component = create(<Icon name="lock" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with size prop', () => {
    const component = create(<Icon name="lock" size="2x" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
