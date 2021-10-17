export const MAP_API_KEY = 'AIzaSyAc4ldBsk1nC8zCTpCgjP8la4m_uYjmtQM';

export const MAP_API = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places`;

export const STATIC_MAP_API = `https://maps.googleapis.com/maps/api/staticmap?center=Philadelphia,PA&zoom=13&size=330x100&maptype=roadmap&key=${MAP_API_KEY}&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:labels.text%7Cvisibility:off&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels%7Cvisibility:off`;

export const COORDINATES_PHILADELPHIA = {
  lat: 39.952583,
  lng: -75.165222
};

export const goldStar = {
  path: 'M 0.000 -3.000 L 14.695 5.225 L 11.413 -11.292 L 23.776 -22.725 L 7.053 -24.708 L 0.000 -40.000 L -7.053 -24.708 L -23.776 -22.725 L -11.413 -11.292 L -14.695 5.225 L 0.000 -3.000',
  fillColor: 'gold',
  fillOpacity: 1,
  scale: 1,
  strokeColor: 'gold',
  strokeWeight: 3
};
