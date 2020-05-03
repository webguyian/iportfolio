import React from 'react';
import { create } from 'react-test-renderer';

import FormField from './FormField';

describe('<FormField />', () => {
  const props = {
    id: 'field',
    label: 'Field label',
    onChange: jest.fn(),
    value: ''
  };

  it('renders correctly', () => {
    const component = create(<FormField {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly as textarea', () => {
    const component = create(<FormField {...props} type="textarea" />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const component = create(<FormField {...props} disabled />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly without onChange prop', () => {
    const component = create(<FormField {...props} onChange={undefined} />);

    expect(component).toMatchSnapshot();
  });

  it('handles onChange event', () => {
    const component = create(<FormField {...props} />).root;
    const input = component.findByType('input');
    const mockEvent = {
      target: {
        value: 'test'
      }
    };

    expect(props.onChange).not.toHaveBeenCalled();
    input.props.onChange(mockEvent);
    expect(props.onChange).toHaveBeenCalledWith(props.id, 'test', mockEvent);
  });
});
