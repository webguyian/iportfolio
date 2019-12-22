import React from 'react';
import { act, create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import RoundedButton from 'components/Button/RoundedButton';
import Timer from './Timer';

describe('<Timer />', () => {
  const props = {
    location: {
      pathname: '/clock/timer/picker'
    },
    match: {
      path: '/clock/timer'
    }
  };

  it('renders correctly', () => {
    const component = create(
      <MemoryRouter>
        <Timer {...props} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly at countdown path', () => {
    const updatedProps = {
      location: {
        pathname: '/clock/timer/countdown'
      },
      match: {
        path: '/clock/timer/countdown',
        isExact: true
      }
    };

    const component = create(
      <MemoryRouter>
        <Timer {...updatedProps} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });

  it('handles toggle', () => {
    const component = create(
      <MemoryRouter>
        <Timer {...props} />
      </MemoryRouter>
    );
    const [, startButton] = component.root.findAllByType(RoundedButton);

    act(() => {
      startButton.props.onClick();
    });

    expect(component).toMatchSnapshot();
  });
});
