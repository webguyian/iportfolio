import React from 'react';
import { create } from 'react-test-renderer';

import Clockface from './Clockface';

describe('<Clockface />', () => {
  it('renders correctly', () => {
    const component = create(<Clockface />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
