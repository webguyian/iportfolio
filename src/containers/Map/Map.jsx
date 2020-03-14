import React, { useRef } from 'react';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import MapSearch from './MapSearch/MapSearch';
import SavedPlaces from './SavedPlaces/SavedPlaces';

import { useGoogleMaps, usePlacesSearch } from 'modules/map/hooks';

const Map = () => {
  const [mapRef, map] = useGoogleMaps();
  const inputRef = useRef();
  const [savedPlaces, onPlaceClick, showSavedView, view] = usePlacesSearch(
    inputRef,
    map
  );
  const baseClass = 'map-app';
  const streetViewClass = view.street && `${baseClass}--street-view`;
  const activeBtnClass = 'ui-btn--active';

  return (
    <div className={classNames(baseClass, streetViewClass)}>
      {map && <MapSearch inputRef={inputRef} />}
      <div className={`${baseClass}-container`} ref={mapRef}>
        <Text className="ui-text--loading" element="h2">
          Loading...
        </Text>
      </div>
      {view.saved && (
        <SavedPlaces onClick={onPlaceClick} places={savedPlaces} />
      )}
      <div className={`${baseClass}-bottom-bar`}>
        <Button
          className={classNames(view.map && activeBtnClass)}
          icon="map-marker-alt"
          size="2x"
          onClick={showSavedView.bind(null, false)}
          withLabel
        >
          Explore
        </Button>
        <Button
          className={classNames(view.saved && activeBtnClass)}
          icon="bookmark"
          size="2x"
          onClick={showSavedView.bind(null, true)}
          withLabel
        >
          Saved
        </Button>
      </div>
    </div>
  );
};

export default Map;
