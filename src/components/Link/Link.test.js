import React from 'react';
import { create } from 'react-test-renderer';

import Link from './Link';

jest.unmock('components/Link/Link');

describe('<Link />', () => {
  it('renders correctly', () => {
    const component = create(<Link to="/">Go home</Link>);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly as back link', () => {
    const component = create(<Link to="/" back />);

    expect(component).toMatchSnapshot();
  });
});
