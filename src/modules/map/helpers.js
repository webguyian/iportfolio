import { goldStar } from './constants';

export const addPlaceToBounds = (place, bounds) => {
  if (place.geometry.viewport) {
    // Only geocodes have viewport
    bounds.union(place.geometry.viewport);
  } else {
    bounds.extend(place.geometry.location);
  }
};

export const addSavedMarkers = (places, map) => {
  const maps = window.google.maps;
  const markers = [];

  if (!places.length) {
    return;
  }

  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    if (!place.geometry) {
      // Place has no geometry
      return;
    }

    // Add marker for each place
    markers.push(
      new maps.Marker({
        map,
        icon: goldStar,
        id: place.id,
        placeInfo: place,
        position: place.geometry.location,
        saved: true
      })
    );

    addPlaceToBounds(place, bounds);
  });
  map.fitBounds(bounds);

  return markers;
};

export const onPlaceSelected = (searchBox, map) => {
  const maps = window.google.maps;
  const places = searchBox.getPlaces();
  const markers = [];

  if (!places.length) {
    return;
  }

  const bounds = new maps.LatLngBounds();
  const fadedStar = {
    ...goldStar,
    fillOpacity: 0.2
  };

  places.forEach(place => {
    if (!place.geometry) {
      // Place has no geometry
      return;
    }

    // Add marker for each place
    markers.push(
      new maps.Marker({
        map,
        icon: fadedStar,
        id: place.id,
        placeInfo: place,
        position: place.geometry.location
      })
    );

    addPlaceToBounds(place, bounds);
  });
  map.fitBounds(bounds);

  return markers;
};

export const toggleMarker = marker => {
  const { icon } = marker;
  const saved = marker.get('saved');
  const toggled = !saved;

  marker.setIcon({
    ...icon,
    fillOpacity: saved ? 0.2 : 1
  });

  marker.set('saved', toggled);

  return toggled;
};
