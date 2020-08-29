import React from 'react';
import { render } from '@testing-library/react';

import LinkList from './LinkList';

describe('<LinkList />', () => {
  const props = {
    links: [
      {
        abbr: 'MD',
        color: '#83d0f2',
        name: 'MDN',
        url: 'https://developer.mozilla.org/en-US/'
      },
      {
        abbr: 'SO',
        color: '#f48024',
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/'
      }
    ]
  };

  it('renders correctly', () => {
    const { asFragment } = render(<LinkList {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
