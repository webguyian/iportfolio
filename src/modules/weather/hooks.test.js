/* eslint-disable camelcase */
import React from 'react';
import { act } from 'react-test-renderer';

import { TestComponent, createMockResponse, testHook } from 'utilities/test';

import { MOCK_TOKEN } from 'modules/browser/constants';
import * as browserHooks from 'modules/browser/hooks';
import * as hooks from './hooks';

describe('Weather hooks', () => {
  const useLocation = hooks.useLocation;
  const useGeolocation = browserHooks.useGeolocation;
  const useFetchAndCache = browserHooks.useFetchAndCache;
  const useFetchAllAndCache = browserHooks.useFetchAllAndCache;

  hooks.useLocation = jest.fn();
  browserHooks.useGeolocation = jest.fn();
  browserHooks.useFetchAndCache = jest.fn();
  browserHooks.useFetchAllAndCache = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset to original implementation before each test
    hooks.useLocation.mockImplementation(useLocation);
    browserHooks.useGeolocation.mockImplementation(useGeolocation);
    browserHooks.useFetchAndCache.mockImplementation(useFetchAndCache);
    browserHooks.useFetchAllAndCache.mockImplementation(useFetchAllAndCache);
  });

  describe('useLocation', () => {
    const data = {
      address_components: {
        number: '10000',
        predirectional: 'N',
        street: 'De Anza',
        suffix: 'Blvd',
        formatted_street: 'N De Anza Blvd',
        city: 'Cupertino',
        county: 'Santa Clara County',
        state: 'CA',
        zip: '95014',
        country: 'US'
      },
      formatted_address: '10000 N De Anza Blvd, Cupertino, CA 95014',
      location: {
        lat: 37.323171,
        lng: -122.032396
      },
      accuracy: 0.99,
      accuracy_type: 'rooftop',
      source: 'City of Palo Alto'
    };

    it('returns null without coodinates', () => {
      let response;

      testHook(() => {
        response = hooks.useLocation(null);
      });

      expect(response).toEqual(null);
    });

    it('returns null without coordinates after update', async () => {
      let response;
      const Component = testHook(() => {
        response = hooks.useLocation(null);
      });

      await act(async () => {
        const callback = () => {
          response = hooks.useLocation(null);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(null);
    });

    it('returns location', async () => {
      let response;
      const coordinates = {
        latitude: 37.323,
        longitude: -122.0322
      };
      const Component = testHook(() => {
        response = hooks.useLocation(coordinates);
      });

      const mockToken = createMockResponse(MOCK_TOKEN);
      const mockResponse = createMockResponse(data);

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(mockResponse);

      await act(async () => {
        const callback = () => {
          response = hooks.useLocation(coordinates);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(data.address_components);
    });

    it('returns location with key', async () => {
      let response;
      const coordinates = {
        latitude: 37.323,
        longitude: -122.0322
      };
      const Component = testHook(() => {
        response = hooks.useLocation(coordinates, 'city');
      });

      const mockToken = createMockResponse(MOCK_TOKEN);
      const mockResponse = createMockResponse(data);

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(mockResponse);

      await act(async () => {
        const callback = () => {
          response = hooks.useLocation(coordinates, 'city');
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual(data.address_components.city);
    });
  });

  describe('useWeatherLocations', () => {
    it('returns empty values', async () => {
      let response;

      const mockToken = createMockResponse(MOCK_TOKEN);
      const mockResponse = createMockResponse([]);

      global.fetch
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(mockResponse);

      testHook(() => {
        response = hooks.useWeatherLocations([]);
      });

      expect(response).toEqual([]);
    });

    it('returns values', async () => {
      let response;
      const locations = [
        {
          city: 'Austin',
          coordinates: {
            lat: 30.2672,
            lon: -97.7431
          }
        },
        {
          city: 'Cupertino',
          coordinates: {
            lat: 37.323,
            lon: -122.0322
          }
        }
      ];
      const locationResponse = [
        {
          latitude: 30.2672,
          longitude: -97.7431,
          timezone: 'America/Chicago'
        },
        {
          latitude: 37.323,
          longitude: -122.0322,
          timezone: 'America/Los_Angeles'
        },
        {
          latitude: 28.5383,
          longitude: -81.3792,
          timezone: 'America/New_York'
        }
      ];

      browserHooks.useFetchAllAndCache.mockReturnValue(locationResponse);

      await act(async () => {
        testHook(() => {
          response = hooks.useWeatherLocations(locations);
        });
      });

      expect(response).toEqual(
        locations.map((location, index) => ({
          ...location,
          ...locationResponse[index]
        }))
      );
    });
  });
});
