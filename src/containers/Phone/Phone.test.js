import React from 'react';
import { create } from 'react-test-renderer';

import Phone from './Phone';

describe('<Phone />', () => {
  it('renders correctly', () => {
    const component = create(<Phone />);

    expect(component).toMatchSnapshot();
  });
});
