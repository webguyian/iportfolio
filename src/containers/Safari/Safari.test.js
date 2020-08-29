import React from 'react';
import { render } from '@testing-library/react';

import Safari from './Safari';

import * as hooks from 'modules/safari/hooks';

describe('<Safari />', () => {
  const useWebSearch = hooks.useWebSearch;
  const actions = {
    onBlur: jest.fn(),
    onCancel: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    value: ''
  };

  hooks.useWebSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useWebSearch.mockImplementation(useWebSearch);
  });

  it('renders correctly', () => {
    const { asFragment } = render(<Safari />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with search', () => {
    hooks.useWebSearch.mockReturnValue([actions, true]);
    const { asFragment } = render(<Safari />);

    expect(asFragment()).toMatchSnapshot();
  });
});
