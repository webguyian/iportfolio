import React from 'react';
import { render } from '@testing-library/react';

import Camera from './Camera';

describe('<Camera />', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Camera />);

    expect(asFragment()).toMatchSnapshot();
  });
});
