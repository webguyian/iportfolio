import { API_WEATHER } from 'modules/weather/constants';
import * as helpers from 'modules/weather/helpers';

describe('Weather helpers', () => {
  it('gets hour', () => {
    expect(helpers.getHour()).toEqual(null);
    expect(helpers.getHour(1584244800)).toEqual('11AM');
  });

  it('gets percentage', () => {
    expect(helpers.getPercentage(0.6245)).toEqual('62%');
    expect(helpers.getPercentage(0.6999)).toEqual('70%');
  });

  it('gets pressure', () => {
    expect(helpers.getPressure(1014.1)).toEqual('29.95');
  });

  it('gets time', () => {
    expect(helpers.getTime()).toEqual(null);
    expect(helpers.getTime(1584244800)).toEqual('11:11AM');
  });

  it('gets weekday', () => {
    expect(helpers.getWeekday(1584244800)).toEqual('Tuesday');
  });

  it('formats temp', () => {
    expect(helpers.formatTemp(48.46)).toEqual('48°');
    expect(helpers.formatTemp(48.46, false)).toEqual('48');
  });

  it('gets temp', () => {
    const location = {
      currently: {
        temperature: 48.46
      }
    };

    expect(helpers.getTemp()).toEqual(null);
    expect(helpers.getTemp(location)).toEqual('48°');
  });

  it('gets weather endpoint', () => {
    const location = {
      coordinates: {
        lat: 37.323,
        lon: -122.0322
      }
    };

    expect(helpers.getWeatherEndpoint(location)).toEqual(
      `${API_WEATHER}/37.323,-122.0322`
    );
  });

  it('gets wind direction', () => {
    expect(helpers.getWindDirection(0)).toEqual('N');
    expect(helpers.getWindDirection(180)).toEqual('S');
    expect(helpers.getWindDirection(90)).toEqual('E');
    expect(helpers.getWindDirection(270)).toEqual('W');
  });
});
