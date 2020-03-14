import React from 'react';
import { act, create } from 'react-test-renderer';

import MapSearch from './MapSearch';

describe('<MapSearch />', () => {
  const props = {
    inputRef: React.createRef()
  };

  it('renders correctly', () => {
    const component = create(<MapSearch {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('handles submit event', () => {
    const component = create(<MapSearch {...props} />);
    const form = component.root.findByType('form');
    const mockEvent = { preventDefault: jest.fn() };

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    act(() => {
      form.props.onSubmit(mockEvent);
    });
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});
