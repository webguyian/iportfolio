import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

const SavedPlaces = props => {
  const { onClick, places } = props;
  const baseClass = 'saved-places';
  const listClass = `${baseClass}-list`;

  return (
    <div className={baseClass}>
      <Text element="h1" type="display">
        Saved
      </Text>
      {places.length ? (
        <ul className={listClass}>
          {places.map(place => (
            <li key={place.id} className={`${listClass}-item`}>
              <Button
                className={`${listClass}-item-btn`}
                onClick={onClick.bind(null, place)}
              >
                <Text element="h2" modifier="bold">
                  {place.name}
                </Text>
                <Text modifier="block">{place.formatted_address}</Text>
                {place.website && (
                  <Link
                    to={place.website}
                    onClick={e => e.stopPropagation()}
                    external
                  >
                    View website
                  </Link>
                )}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`${baseClass}-empty-message`}>
          <Text element="p">You have no saved places.</Text>
          <Text element="p">
            Explore the map by searching and star your favorites.
          </Text>
        </div>
      )}
    </div>
  );
};

SavedPlaces.propTypes = {
  onClick: PropTypes.func.isRequired,
  places: PropTypes.array.isRequired
};

export default SavedPlaces;
