/* eslint-disable camelcase */
import React from 'react';
import { act, create } from 'react-test-renderer';

import SavedPlaces from './SavedPlaces';

describe('<SavedPlaces />', () => {
  const props = {
    onClick: jest.fn(),
    places: [
      {
        id: 'a',
        name: 'Place A',
        formatted_address: '123 Apple Road'
      },
      {
        id: 'b',
        name: 'Place B',
        formatted_address: '456 Cherry Lane',
        website: 'http://theplace.to.b'
      }
    ]
  };

  it('renders correctly', () => {
    const component = create(<SavedPlaces {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly without places', () => {
    const component = create(<SavedPlaces {...props} places={[]} />);

    expect(component).toMatchSnapshot();
  });

  it('handles link click', () => {
    const component = create(<SavedPlaces {...props} />);
    const [link] = component.root.findAllByType('mock-link');
    const mockEvent = { stopPropagation: jest.fn() };

    expect(mockEvent.stopPropagation).not.toHaveBeenCalled();

    act(() => {
      link.props.onClick(mockEvent);
    });

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });
});
