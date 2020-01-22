import React from 'react';
import { act, create } from 'react-test-renderer';

import ToggleSwitch from './ToggleSwitch';

describe('<ToggleSwitch />', () => {
  const props = {
    onUpdate: jest.fn()
  };

  it('renders correctly', () => {
    const component = create(<ToggleSwitch {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('handles change', () => {
    const component = create(<ToggleSwitch {...props} />);
    const input = component.root.findByType('input');

    act(() => {
      input.props.onChange({ target: { checked: true } });
    });

    expect(component).toMatchSnapshot();
  });
});
