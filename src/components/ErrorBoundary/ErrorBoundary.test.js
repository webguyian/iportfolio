import React from 'react';
import { render } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

describe('<ErrorBoundary />', () => {
  console.error = jest.fn();

  /* eslint-disable */
  const Component = ({ text }) => (
    <div>Component goes here {text.undefined}</div>
  );
  /* eslint-enable */
  const props = {
    children: <Component />
  };

  it('renders correctly with error', () => {
    const { asFragment } = render(<ErrorBoundary {...props} />);

    expect(asFragment()).toMatchSnapshot();
    expect(console.error).toHaveBeenCalled();
  });

  it('renders correctly without error', () => {
    const { asFragment } = render(
      <ErrorBoundary>
        <div>Component goes here</div>
      </ErrorBoundary>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
