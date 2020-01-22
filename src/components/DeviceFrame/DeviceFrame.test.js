import React from 'react';
import { create } from 'react-test-renderer';

import * as hooks from 'hooks';

import DeviceFrame from './DeviceFrame';

describe('<DeviceFrame />', () => {
  const useBreakpointHook = hooks.useBreakpoint;

  hooks.useBreakpoint = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useBreakpoint.mockImplementation(useBreakpointHook);
  });

  it('renders correctly', () => {
    const component = create(<DeviceFrame />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with leftIndicator', () => {
    const component = create(<DeviceFrame leftIndicator={<span>8:30</span>} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly on mobile', () => {
    hooks.useBreakpoint.mockReturnValue(true);
    const component = create(<DeviceFrame />);

    expect(component).toMatchSnapshot();
  });
});
