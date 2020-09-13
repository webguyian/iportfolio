import React from 'react';
import { act, render } from '@testing-library/react';

import { createMockResponse } from 'utilities/test';
import * as hooks from 'modules/messages/hooks';

import Messages from './Messages';

describe('<Messages />', () => {
  const useMessages = hooks.useMessages;

  hooks.useMessages = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useMessages.mockImplementation(useMessages);
  });

  const messages = [
    {
      from: 'webguyian',
      id: '7759323934669805488',
      message: 'Hey there! How are you?',
      timestamp: '2020-10-11T01:26:27.872421Z'
    },
    {
      id: 'b7ad2068aea41',
      message: 'Hi. Good, and you?',
      timestamp: '2020-10-11T01:26:33.802Z',
      to: 'webguyian'
    },
    {
      from: 'webguyian',
      id: '8995450515272087918',
      message: "I am ok, what's up?",
      timestamp: '2020-10-11T01:26:34.117400Z'
    },
    {
      id: '1010fb9fa8adf',
      message: 'Just checking out your site.',
      timestamp: '2020-10-11T01:26:40.777Z',
      to: 'webguyian'
    }
  ];

  it('renders correctly', async () => {
    let component;
    const response = createMockResponse(messages[0]);

    global.fetch.mockReturnValue(response);

    await act(async () => {
      const result = render(<Messages />);

      component = result.asFragment();
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with messages', async () => {
    let component;

    hooks.useMessages.mockReturnValue([messages, React.createRef(), jest.fn()]);

    await act(async () => {
      const result = render(<Messages />);

      component = result.asFragment();
    });

    expect(component).toMatchSnapshot();
  });
});
