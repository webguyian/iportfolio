import { useCallback, useEffect, useRef, useState } from 'react';

import { useGeolocation, useStorageCache } from 'modules/browser/hooks';
import { MAP_API } from './constants';
import { addSavedMarkers, onPlaceSelected, toggleMarker } from './helpers';

export const useGoogleMaps = () => {
  const coordinates = useGeolocation();
  const ref = useRef();
  const [map, setMap] = useState();
  const scriptId = 'map-script';

  const onLoad = () => {
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      const options = {
        center: { lat: latitude, lng: longitude },
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: true,
        zoom: 16
      };

      setMap(new window.google.maps.Map(ref.current, options));
    }
  };

  useEffect(() => {
    if (!window.google && !document.getElementById(scriptId)) {
      const script = document.createElement('script');

      script.id = scriptId;
      script.src = MAP_API;
      script.addEventListener('load', onLoad);
      document.body.appendChild(script);

      return () => script.removeEventListener('load', onLoad);
    } else if (window.google) {
      onLoad();
    } else {
      setTimeout(onLoad, 1000);
    }
  }, [coordinates]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const { maps } = window.google;
    const icon = {
      path: `M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0`,
      scale: 1,
      fillColor: '#0056ff',
      fillOpacity: 0.9,
      strokeWeight: 4,
      strokeColor: '#fefefe'
    };

    const marker = new maps.Marker({
      position: map.getCenter(),
      map,
      icon
    });

    marker.setMap(map);
  }, [map]);

  return [ref, map];
};

export const useGooglePlacesSearch = (inputRef, map) => {
  const [isStreetView, setStreetView] = useState(false);
  const [searchBox, setSearchBox] = useState(null);
  const maps = window.google && window.google.maps;

  useEffect(() => {
    const input = inputRef && inputRef.current;

    if (!input || !map) {
      return;
    }

    const mapSearch = new maps.places.SearchBox(input);
    const streetView = map.getStreetView();

    map.addListener('bounds_changed', () => {
      mapSearch.setBounds(map.getBounds());
    });

    maps.event.addListener(streetView, 'visible_changed', () => {
      setStreetView(streetView.getVisible());
    });

    setSearchBox(mapSearch);
  }, [inputRef, map]);

  return [searchBox, isStreetView];
};

export const usePlacesMarkers = (searchBox, map) => {
  const [markers, setMarkers] = useState([]);
  const onPlaceClick = useCallback(
    marker => {
      setMarkers(currentMarkers => {
        return currentMarkers.map(currentMarker => {
          if (currentMarker.id === marker.id) {
            toggleMarker(currentMarker);
          }

          return currentMarker;
        });
      });
    },
    [markers]
  );

  const updateMarkers = (newMarkers = []) => {
    setMarkers(currentMarkers => {
      return currentMarkers
        .reduce((acc, marker) => {
          if (marker.saved) {
            return acc.concat(marker);
          } else {
            // Remove unsaved markers
            marker.setMap(null);
            return acc;
          }
        }, [])
        .concat(newMarkers);
    });
  };

  useEffect(() => {
    if (!searchBox) {
      return;
    }

    searchBox.addListener('places_changed', () => {
      const updatedMarkers = onPlaceSelected(searchBox, map);

      updateMarkers(updatedMarkers);
    });
  }, [searchBox]);

  useEffect(() => {
    const maps = window.google && window.google.maps;

    markers.forEach(marker => {
      if (!marker.hasOwnProperty('saved')) {
        maps.event.addListener(
          marker,
          'click',
          onPlaceClick.bind(null, marker)
        );
      }
    });
  }, [markers]);

  return [markers, updateMarkers];
};

export const useSavedPlaces = (map, markers) => {
  const [place, setPlace] = useState(null);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [savedMarkers, setSavedMarkers] = useState([]);
  const [tempCache, setTempCache] = useState(null);
  const cache = useStorageCache(
    'saved-places',
    { places: savedPlaces },
    c => !c.places.length
  );
  const maps = window.google && window.google.maps;

  useEffect(() => {
    const cachedPlaces = cache && cache.places;

    if (cachedPlaces && cachedPlaces.length) {
      // Temporarily set cached places
      setTempCache(cachedPlaces);
    }
  }, []);

  useEffect(() => {
    const updatedMarkers = savedMarkers
      .concat(markers)
      .reduce((acc, marker) => {
        return marker.saved ? acc.concat(marker.placeInfo) : acc;
      }, []);

    setSavedPlaces(updatedMarkers);
  }, [markers, savedMarkers]);

  useEffect(() => {
    if (!place) {
      return;
    }

    const { geometry } = place;
    const bounds = new maps.LatLngBounds();

    if (geometry.viewport) {
      // Only geocodes have viewport
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }

    map.fitBounds(bounds);
  }, [place]);

  useEffect(() => {
    if (!map || !tempCache) {
      return;
    }

    const updatedMarkers = addSavedMarkers(tempCache, map);

    updatedMarkers.forEach(marker => {
      maps.event.addListener(marker, 'click', () => {
        const saved = toggleMarker(marker);

        setSavedMarkers(currentMarkers => {
          return currentMarkers.map(m => {
            return m.id === marker.id ? { ...m, saved } : m;
          });
        });
      });
    });

    setSavedMarkers(updatedMarkers);
    setTempCache(null);
  }, [map, tempCache]);

  return [savedPlaces, setPlace];
};

export const usePlacesSearch = (inputRef, map) => {
  const [searchBox, isStreetView] = useGooglePlacesSearch(inputRef, map);
  const [markers, setMarkers] = usePlacesMarkers(searchBox, map);
  const [savedMarkers, setPlace] = useSavedPlaces(map, markers);
  const [showSaved, setShowSaved] = useState(false);
  const showSavedView = value => {
    inputRef.current.value = '';
    setMarkers();
    setShowSaved(value);
  };
  const handlePlaceClick = selectedPlace => {
    setPlace(selectedPlace);
    showSavedView(false);
  };
  const view = {
    map: !showSaved,
    street: isStreetView,
    saved: showSaved
  };

  return [savedMarkers, handlePlaceClick, showSavedView, view];
};
