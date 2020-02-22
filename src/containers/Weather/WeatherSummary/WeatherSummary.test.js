import React from 'react';
import { create } from 'react-test-renderer';

import WeatherSummary from './WeatherSummary';

describe('<WeatherSummary />', () => {
  const props = {
    currentHour: {
      time: 1583676000,
      summary: 'Clear',
      icon: 'clear-day',
      temperature: 41.17,
      apparentTemperature: 41.17
    },
    today: {
      time: 1583643600,
      summary: 'Clear throughout the day.',
      icon: 'clear-day',
      sunriseTime: 1583666580,
      sunsetTime: 1583708460,
      moonPhase: 0.47,
      precipIntensity: 0.0004,
      precipIntensityMax: 0.002,
      precipIntensityMaxTime: 1583703480,
      precipProbability: 0.03,
      precipType: 'snow',
      precipAccumulation: 0.04,
      temperatureHigh: 58.95,
      temperatureHighTime: 1583698500,
      temperatureLow: 38.77,
      temperatureLowTime: 1583752380,
      apparentTemperatureHigh: 58.45,
      apparentTemperatureHighTime: 1583698500,
      apparentTemperatureLow: 33.74,
      apparentTemperatureLowTime: 1583752260,
      dewPoint: 24.59,
      humidity: 0.53,
      pressure: 1031.5,
      windSpeed: 5.68,
      windGust: 23.83,
      windGustTime: 1583726400,
      windBearing: 237,
      cloudCover: 0.01,
      uvIndex: 5,
      uvIndexTime: 1583687400,
      visibility: 10,
      ozone: 341.9,
      temperatureMin: 26.36,
      temperatureMinTime: 1583667300,
      temperatureMax: 58.95,
      temperatureMaxTime: 1583698500,
      apparentTemperatureMin: 26.85,
      apparentTemperatureMinTime: 1583667300,
      apparentTemperatureMax: 58.45,
      apparentTemperatureMaxTime: 1583698500
    }
  };

  it('renders correctly', () => {
    const component = create(<WeatherSummary {...props} />);

    expect(component).toMatchSnapshot();
  });
});
