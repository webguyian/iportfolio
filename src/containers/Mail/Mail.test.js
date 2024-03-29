import React from 'react';
import { act, create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import * as hooks from 'modules/mail/hooks';
import Mail from './Mail';

describe('<Mail />', () => {
  const props = { location: {} };
  const useMail = hooks.useMail;

  hooks.useMail = jest.fn();

  const eventHandlers = {
    onCancel: jest.fn(),
    onConfirmCancel: jest.fn(),
    onDelete: jest.fn(),
    onSubmit: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useMail.mockImplementation(useMail);
  });

  it('renders correctly', () => {
    const component = create(
      <MemoryRouter>
        <Mail {...props} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with controls', async () => {
    const fields = {
      to: 'hello@webguyian.com',
      from: 'test@tester.com',
      subject: 'Testing...',
      body: 'This is a test'
    };

    await act(async () => {
      hooks.useMail.mockReturnValueOnce([
        fields,
        jest.fn(),
        {
          invalid: false,
          showControls: true
        },
        eventHandlers
      ]);
    });

    const component = create(
      <MemoryRouter>
        <Mail {...props} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
