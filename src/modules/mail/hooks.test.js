import React from 'react';
import { act } from 'react-test-renderer';
import * as router from 'react-router-dom';

import { TestComponent, testHookWithRouter } from 'utilities/test';

import { initialValues } from './constants';
import * as hooks from './hooks';

describe('Mail hooks', () => {
  const useMail = hooks.useMail;
  const useHistory = router.useHistory;
  const MemoryRouter = router.MemoryRouter;

  hooks.useMail = jest.fn();
  router.useHistory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useMail.mockImplementation(useMail);
    router.useHistory.mockImplementation(useHistory);
  });

  describe('useMail', () => {
    it('returns values', () => {
      let response;
      const state = {
        invalid: false,
        showControls: false
      };
      const eventHandlers = {
        onCancel: expect.any(Function),
        onConfirmCancel: expect.any(Function),
        onDelete: expect.any(Function),
        onSubmit: expect.any(Function)
      };

      testHookWithRouter(() => {
        response = hooks.useMail();
      });

      expect(response[0]).toEqual(initialValues);
      expect(response[1]).toEqual(expect.any(Function));
      expect(response[2]).toEqual(state);
      expect(response[3]).toEqual(eventHandlers);
    });

    it('returns values after update', async () => {
      let response;
      const state = {
        invalid: true,
        showControls: false
      };
      const eventHandlers = {
        onCancel: expect.any(Function),
        onConfirmCancel: expect.any(Function),
        onDelete: expect.any(Function),
        onSubmit: expect.any(Function)
      };
      const Component = testHookWithRouter(() => {
        response = hooks.useMail();
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useMail();
        };

        Component.update(
          <MemoryRouter>
            <TestComponent callback={callback} />
          </MemoryRouter>
        );
      });

      expect(response[0]).toEqual(initialValues);
      expect(response[1]).toEqual(expect.any(Function));
      expect(response[2]).toEqual(state);
      expect(response[3]).toEqual(eventHandlers);
    });

    it('handles setting field values', async () => {
      let response;
      const Component = testHookWithRouter(() => {
        response = hooks.useMail();
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useMail();
        };

        Component.update(
          <MemoryRouter>
            <TestComponent callback={callback} />
          </MemoryRouter>
        );
      });

      let [fields, setField] = response;

      expect(fields.from).toEqual('');

      await act(async () => {
        setField('from', 'test@tester.com');
        setField('subject', 'Test');
        setField('body', 'This is a test.');
      });

      [fields, setField] = response;

      expect(fields.from).toEqual('test@tester.com');
    });

    it('handles cancel callback', async () => {
      let response;
      const Component = testHookWithRouter(() => {
        response = hooks.useMail();
      });
      const mockEvent = {
        preventDefault: jest.fn()
      };

      await act(async () => {
        const callback = () => {
          response = hooks.useMail();
        };

        Component.update(
          <MemoryRouter>
            <TestComponent callback={callback} />
          </MemoryRouter>
        );
      });

      const [, setField, , eventHandlers] = response;

      expect(eventHandlers.onCancel).toBeDefined();
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();

      await act(async () => {
        setField('subject', 'Test');
        eventHandlers.onCancel(mockEvent);
      });
    });
  });
});
