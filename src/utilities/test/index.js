import React from 'react';
import { create } from 'react-test-renderer';

export const mockTime = Number(new Date('2019-10-01T11:11:00'));

export const TestComponent = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback = () => {}) => {
  return create(<TestComponent callback={callback} />);
};

Date.now = jest.fn(() => mockTime);

window.matchMedia = jest.fn().mockImplementation(media => {
  return {
    matches: false,
    media
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: 'Link'
}));

jest.mock('components/Link/Link', () => 'Link');
