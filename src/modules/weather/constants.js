export const DEFAULT_LOCATIONS = [
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
  },
  {
    city: 'Orlando',
    coordinates: {
      lat: 28.5383,
      lon: -81.3792
    }
  },
  {
    city: 'Philadelphia',
    coordinates: {
      lat: 39.9526,
      lon: -75.1652
    }
  },
  {
    city: 'Juneau',
    coordinates: {
      lat: 58.3019,
      lon: -134.4197
    }
  }
];

export const GEOCODE_API_KEY = '9ed6e9d552b2a5be5de65e5baa5b5ac59e65255';

export const GEOCODE_API = `https://api.geocod.io/v1.4/geocode?api_key=${GEOCODE_API_KEY}`;

export const GEOCODE_REVERSE_API = `https://api.geocod.io/v1.4/reverse?api_key=${GEOCODE_API_KEY}`;

export const WEATHER_API_KEY = '90272d28d9358ad1046f2d7162e37eeb';

export const WEATHER_API = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_API_KEY}`;

export const WIND_DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N'
];
