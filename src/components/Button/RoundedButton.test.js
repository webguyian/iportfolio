import React from 'react';
import { create } from 'react-test-renderer';

import RoundedButton from './RoundedButton';

describe('<RoundedButton />', () => {
  it('renders correctly', () => {
    const component = create(<RoundedButton />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
