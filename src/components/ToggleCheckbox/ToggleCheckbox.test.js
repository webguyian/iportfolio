import React from 'react';
import { render } from '@testing-library/react';

import ToggleCheckbox from './ToggleCheckbox';

describe('<ToggleCheckbox />', () => {
  const props = {
    checked: true
  };

  it('renders correctly', () => {
    const { asFragment } = render(<ToggleCheckbox {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly unchecked', () => {
    const { asFragment } = render(<ToggleCheckbox />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly disabled', () => {
    const { asFragment } = render(<ToggleCheckbox disabled />);

    expect(asFragment()).toMatchSnapshot();
  });
});
