import React from 'react';
import { act, render } from '@testing-library/react';

import Lockscreen from './Lockscreen';

describe('<Lockscreen />', () => {
  const props = {
    history: { push: jest.fn() }
  };

  window.scrollTo = jest.fn();

  it('renders correctly', async () => {
    let component;

    await act(async () => {
      const result = render(<Lockscreen {...props} />);

      component = result.asFragment();
    });

    expect(component).toMatchSnapshot();
  });
});
