import React from 'react';
import renderer from 'react-test-renderer';

import RoundedButton from './RoundedButton';

describe('<RoundedButton />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<RoundedButton />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
