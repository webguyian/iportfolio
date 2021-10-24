import React from 'react';
import { bool, object } from 'prop-types';
import cx from 'classnames';

import Link from 'components/Link/Link';
import Text from 'components/Text/Text';
import PhotoView from 'containers/Photos/PhotoView/PhotoView';

import { formatCreatedDate, getPhotoIndex } from 'modules/photos/helpers';
import { usePhotos } from 'modules/photos/hooks';

const PhotoGallery = props => {
  const { favoritesOnly, location } = props;
  const [allPhotos, , favorites] = usePhotos();
  const photoIndex = getPhotoIndex(location);
  const photos = favoritesOnly ? favorites : allPhotos;
  const currentPhoto = photos[photoIndex];
  const pathType = favoritesOnly ? 'favorites' : 'gallery';
  const title = favoritesOnly ? 'Favorites' : 'Photos';
  const message = favoritesOnly
    ? 'Tap the heart to favorite some of your photos.'
    : 'Take snapshots from the Camera app.';
  const baseClass = 'photo-gallery';
  const photoClass = `${baseClass}-photo`;
  const frameClass = `${photoClass}-frame`;
  const favoriteClass = `${frameClass}--favorite`;

  if (currentPhoto) {
    return <PhotoView photo={currentPhoto} />;
  }

  return (
    <div className={baseClass}>
      <Text element="h1" type="display">
        {title}
      </Text>
      {photos && photos.length ? (
        <div className={`${baseClass}-grid`}>
          {photos.map((photo, index) => (
            <Link
              key={photo.metadata.dateCreated}
              className={cx(
                frameClass,
                photo.metadata.favorited && favoriteClass
              )}
              to={`/photos/${pathType}/${index}`}
              state={{ theme: 'black-dark' }}
            >
              <img
                className={photoClass}
                alt={`Photo taken ${formatCreatedDate(photo)}`}
                src={photo.image}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className={`${baseClass}-empty`}>
          <Text
            className={`${baseClass}-empty-message`}
            element="p"
            modifier="bold"
          >
            No {title.toLowerCase()} found.
          </Text>
          <Text className={`${baseClass}-empty-message`} element="p">
            {message}
          </Text>
        </div>
      )}
    </div>
  );
};

PhotoGallery.propTypes = {
  favoritesOnly: bool,
  location: object.isRequired
};

PhotoGallery.defaultProps = {
  favoritesOnly: false
};

export default PhotoGallery;
