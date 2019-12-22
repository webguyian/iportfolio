import React from 'react';
import { create } from 'react-test-renderer';

import Countdown from './Countdown';

describe('<Countdown />', () => {
  const props = {
    allSeconds: 180,
    duration: 210,
    hours: 0,
    minutes: 3,
    seconds: 0
  };

  it('renders correctly', () => {
    const component = create(<Countdown {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with hours', () => {
    const updatedProps = {
      allSeconds: 4830,
      duration: 4830,
      hours: 1,
      minutes: 20,
      seconds: 30,
      running: true
    };

    const component = create(<Countdown {...updatedProps} />);

    expect(component).toMatchSnapshot();
  });
});
