import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

export const mockDate = new Date('2019-10-01T11:11:00Z');
export const mockTime = Number(mockDate);

export const TestComponent = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback = () => {}) => {
  return create(<TestComponent callback={callback} />);
};

export const testHookWithRouter = (callback = () => {}) => {
  return create(
    <MemoryRouter>
      <TestComponent callback={callback} />
    </MemoryRouter>
  );
};

export const originalDate = global.Date;

global.Date = jest.fn(() => mockDate);
global.Date.now = jest.fn(() => mockTime);
global.Date.UTC = jest.fn(() => 1572606660000);
global.fetch = jest.fn().mockResolvedValue({ json: () => Promise.resolve({}) });

export const createMockResponse = data => {
  return Promise.resolve({
    json: () => data
  });
};

global.matchMedia = jest.fn().mockImplementation(media => {
  return {
    matches: false,
    media
  };
});

global.navigator.geolocation = {
  getCurrentPosition: jest.fn().mockImplementation(success =>
    Promise.resolve(
      success({
        coords: {
          latitude: 10,
          longitude: 10
        }
      })
    )
  )
};

global.navigator.mediaDevices = {
  getUserMedia: jest.fn(() => {})
};

global.HTMLMediaElement.prototype.load = jest.fn();
global.HTMLMediaElement.prototype.play = jest.fn();
global.HTMLMediaElement.prototype.pause = jest.fn();

const boundsInstance = {
  union: jest.fn(),
  extend: jest.fn()
};

const mapInstance = {
  getCenter: jest.fn()
};
const searchInstance = {
  addListener: jest.fn(),
  getPlaces: jest.fn(() => []),
  setBounds: jest.fn()
};

global.google = {
  maps: {
    event: {
      addListener: jest.fn()
    },
    places: {
      SearchBox: jest.fn(() => searchInstance)
    },
    LatLngBounds: jest.fn(() => boundsInstance),
    Map: jest.fn(() => mapInstance),
    Marker: jest.fn(() => ({ setMap: jest.fn() }))
  }
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: 'Link'
}));

jest.mock('components/Link/Link', () => 'mock-link');
