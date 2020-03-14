import React from 'react';
import { act } from 'react-test-renderer';

import { TestComponent, testHook } from 'utilities/test';
import * as browserHooks from 'modules/browser/hooks';
import * as hooks from './hooks';

describe('Map hooks', () => {
  const useGeolocation = browserHooks.useGeolocation;

  browserHooks.useGeolocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset to original implementation before each test
    browserHooks.useGeolocation.mockImplementation(useGeolocation);
  });
  const map = {
    addListener: jest.fn(),
    getBounds: jest.fn(),
    getStreetView: jest.fn(() => ({
      getVisible: () => true
    }))
  };

  describe('useGoogleMaps', () => {
    it('returns initial values', () => {
      const ref = React.createRef();
      let response;

      ref.current = undefined;

      testHook(() => {
        response = hooks.useGoogleMaps();
      });

      expect(response).toEqual([ref, undefined]);
    });

    it('returns values', () => {
      const ref = React.createRef();
      const mapState = new window.google.maps.Map();
      let response;

      ref.current = undefined;

      testHook(() => {
        response = hooks.useGoogleMaps();
      });

      expect(response).toEqual([ref, mapState]);
    });
  });

  describe('useGooglePlacesSearch', () => {
    it('returns initial values', () => {
      let response;

      testHook(() => {
        response = hooks.useGooglePlacesSearch();
      });

      expect(response).toEqual([null, false]);
    });

    it('returns values', () => {
      let response;
      const inputRef = React.createRef();
      const maps = window.google.maps;
      const searchBox = new maps.places.SearchBox();
      const Component = testHook(() => {
        response = hooks.useGooglePlacesSearch(inputRef, map);
      });

      searchBox.setBounds = jest.fn();

      act(() => {
        inputRef.current = {};

        const callback = () => {
          response = hooks.useGooglePlacesSearch(inputRef, map);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      expect(response).toEqual([expect.any(Object), false]);
      const [, boundsCallback] = map.addListener.mock.calls[0];

      expect(map.addListener).toHaveBeenCalledWith(
        'bounds_changed',
        boundsCallback
      );

      act(() => {
        boundsCallback();
      });

      expect(map.getBounds).toHaveBeenCalled();

      const [, , visibleCallback] = maps.event.addListener.mock.calls[0];

      act(() => {
        visibleCallback();
      });

      const [, isStreetView] = response;

      expect(isStreetView).toBe(true);
    });
  });

  describe('usePlacesMarkers', () => {
    it('returns initial values', () => {
      const maps = window.google.maps;
      const searchBox = new maps.places.SearchBox();

      let response;

      testHook(() => {
        response = hooks.usePlacesMarkers(searchBox, map);
      });

      expect(response).toEqual([[], expect.any(Function)]);
    });

    it('returns values', () => {
      const maps = window.google.maps;
      const searchBox = new maps.places.SearchBox();

      let response;

      const Component = testHook(() => {
        response = hooks.usePlacesMarkers(searchBox, map);
      });

      act(() => {
        const callback = () => {
          response = hooks.usePlacesMarkers(searchBox, map);
        };

        Component.update(<TestComponent callback={callback} />);
      });

      const [markers, updateMarkers] = response;

      expect(response).toEqual([[], expect.any(Function)]);
      const marker = {
        name: 'marker1',
        get: jest.fn(() => false),
        set: jest.fn(),
        setIcon: jest.fn(),
        setMap: jest.fn()
      };

      act(() => {
        updateMarkers([marker]);
        updateMarkers();
      });

      act(() => {
        const updatedMarkers = [
          marker,
          {
            ...marker,
            name: 'marker2',
            saved: true
          }
        ];

        updateMarkers(updatedMarkers);
        updateMarkers(updatedMarkers);
      });

      expect(markers).toEqual([]);
      expect(searchBox.addListener).toHaveBeenCalledWith(
        'places_changed',
        expect.any(Function)
      );
      const [, placesChangedCallback] = searchBox.addListener.mock.calls[0];

      act(() => {
        placesChangedCallback();
      });

      expect(maps.event.addListener).toHaveBeenCalled();
      const [, , onPlaceClick] = maps.event.addListener.mock.calls[0];

      act(() => {
        onPlaceClick();
      });
    });
  });
});
