import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import { useLocalStorage } from 'modules/browser/hooks';
import { getCreatedDate } from 'modules/photos/helpers';
import { defaultBody, defaultValues } from 'modules/mail/constants';

export const usePhotos = () => {
  const [unsortedPhotos, setPhotos] = useLocalStorage('photos', []);
  const photos = unsortedPhotos
    .slice(0)
    .sort((a, b) => getCreatedDate(a) - getCreatedDate(b));
  const favorites = photos.filter(photo => photo.metadata.favorited);

  return [photos, setPhotos, favorites];
};

export const usePhoto = selection => {
  const history = useHistory();
  const [photos, setPhotos] = usePhotos();
  const [showControls, setControls] = useState(false);
  const match = photos.find(
    photo => getCreatedDate(photo) === getCreatedDate(selection)
  );
  const favoritePhoto = () => {
    const updatedPhotos = photos.map(photo => {
      return photo === match
        ? {
            ...photo,
            metadata: {
              ...photo.metadata,
              favorited: !photo.metadata.favorited,
              dateUpdated: Number(new Date())
            }
          }
        : photo;
    });

    setPhotos(updatedPhotos);
  };

  const deletePhoto = () => {
    const updatedPhotos = photos.filter(photo => photo !== match);

    setPhotos(updatedPhotos);
    history.goBack();
  };

  const navigateTo = photo => {
    const theme = 'black-dark';

    history.push({
      pathname: `/photos/gallery/${photo}`,
      state: {
        theme
      }
    });
  };

  const actions = {
    onBack: event => {
      event.preventDefault();
      history.goBack();
    },
    onCancel: () => {
      setControls(false);
    },
    onConfirmDelete: () => {
      setControls(!showControls);
    },
    onDelete: deletePhoto,
    onFavorite: favoritePhoto,
    onShare: () => {
      history.push({
        pathname: '/mail',
        state: {
          ...defaultValues,
          attachment: match.image,
          body: 'Check out my awesome selfie!'.concat(defaultBody)
        }
      });
    },
    onSwipe: eventInfo => {
      const { dir } = eventInfo;
      const photoIndex = photos.indexOf(match);
      const isLeft = dir === 'Left';
      const nextIndex = isLeft ? photoIndex - 1 : photoIndex + 1;
      const lastPhotoIndex = photos.length - 1;

      if (isLeft && !photoIndex) {
        navigateTo(lastPhotoIndex);
      } else if (!isLeft && photoIndex === lastPhotoIndex) {
        navigateTo(0);
      } else {
        navigateTo(nextIndex);
      }
    }
  };

  return [match, actions, showControls];
};

export const useSwipeOffset = (callback, initial = 0) => {
  const [offset, setOffset] = useState(initial);
  const directions = ['Left', 'Right'];

  const handleSwipe = eventInfo => {
    if (!directions.includes(eventInfo.dir)) {
      // Exit early if not left swipe
      return false;
    }

    setOffset(eventInfo.deltaX);
  };

  const handleSwipeLeft = eventInfo => {
    const { deltaX } = eventInfo;

    if (deltaX > 50) {
      callback(eventInfo);
    }
  };

  const handleSwipeRight = eventInfo => {
    const { deltaX } = eventInfo;

    if (deltaX < -50) {
      callback(eventInfo);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    onSwiping: handleSwipe,
    trackMouse: true
  });

  return [handlers, offset, setOffset];
};
