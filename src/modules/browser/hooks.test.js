import React from 'react';
import { act } from 'react-test-renderer';

import { TestComponent, createMockResponse, testHook } from 'utilities/test';

import { MOCK_TOKEN } from './constants';
import * as helpers from './helpers';
import * as hooks from './hooks';

describe('Browser hooks', () => {
  const useStorageCacheHook = hooks.useStorageCache;
  const isExpired = helpers.isExpired;
  const isExpiredNews = helpers.isExpiredNews;

  hooks.useStorageCache = jest.fn();
  helpers.isExpired = jest.fn();
  helpers.isExpiredNews = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to original implementation before each test
    hooks.useStorageCache.mockImplementation(useStorageCacheHook);
    helpers.isExpired.mockImplementation(isExpired);
    helpers.isExpiredNews.mockImplementation(isExpiredNews);
  });

  describe('useFetch', () => {
    it('does not fetch data with empty endpoint', () => {
      let response;

      testHook(() => {
        response = hooks.useFetch('');
      });

      expect(response).toEqual(null);
    });

    it('fetches data', async () => {
      const endpoint = 'http://example.endpoint';
      const responseData = { data: [10, 20, 30] };
      let response;
      const Component = testHook(() => {
        response = hooks.useFetch(endpoint);
      });

      const mockToken = createMockResponse(MOCK_TOKEN);
      const mockResponse = createMockResponse(responseData);

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(mockResponse);

      await act(async () => {
        const callback = () => {
          response = hooks.useFetch(endpoint);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(responseData);
    });
  });

  describe('useFetchAll', () => {
    it('does not fetch data with empty endpoints', () => {
      let response;

      testHook(() => {
        response = hooks.useFetchAll([]);
      });

      expect(response).toEqual([]);
    });

    xit('fetches data', async () => {
      const endpoints = ['http://example.endpoint', 'http://example.endpoint'];
      const mockToken = createMockResponse(MOCK_TOKEN);
      const responseData = { data: [10, 20, 30] };
      const mockResponse = createMockResponse(responseData);
      let response;

      global.fetch.mockReturnValue(mockToken).mockReturnValue(mockResponse);
      const Component = testHook(() => {
        response = hooks.useFetchAll(endpoints);
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useFetchAll(endpoints);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual([responseData, responseData]);
    });
  });
});
