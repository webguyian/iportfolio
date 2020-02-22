import React from 'react';
import { create } from 'react-test-renderer';

export const mockDate = new Date('2019-10-01 11:11:00 GMT-0400');
export const mockTime = Number(mockDate);

export const TestComponent = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback = () => {}) => {
  return create(<TestComponent callback={callback} />);
};

Date.now = jest.fn(() => mockTime);

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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: 'Link'
}));

jest.mock('components/Link/Link', () => 'Link');