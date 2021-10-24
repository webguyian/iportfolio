import React from 'react';
import { object } from 'prop-types';
import cx from 'classnames';

import Button from 'components/Button/Button';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

import { heartOutline } from 'modules/photos/constants';
import {
  formatCreatedDate,
  formatCreatedDateRelative
} from 'modules/photos/helpers';
import { usePhoto, useSwipeOffset } from 'modules/photos/hooks';

const PhotoView = props => {
  const [photo, actions, showControls] = usePhoto(props.photo);
  const [handlers] = useSwipeOffset(actions.onSwipe);
  const baseClass = 'photo-view';
  const controlsClass = `${baseClass}-controls`;
  const showControlsClass = showControls && `${controlsClass}--show`;

  if (!photo) {
    return null;
  }

  const isFavorite = photo.metadata.favorited;

  return (
    <div className={baseClass}>
      <div className={`${baseClass}-top-bar`}>
        <Link to="/photos/gallery" back onClick={actions.onBack} />
        <Text>{formatCreatedDateRelative(photo)}</Text>
        <Button className="ui-btn--edit" disabled>
          Edit
        </Button>
      </div>
      <div className={`${baseClass}-image-wrapper`} {...handlers}>
        <img
          className={`${baseClass}-image`}
          alt={`Photo taken ${formatCreatedDate(photo)}`}
          src={photo.image}
        />
      </div>
      <div className={cx(controlsClass, showControlsClass)}>
        <Button modifier="anchor-block" onClick={actions.onDelete}>
          Delete Photo
        </Button>
        <Button modifier="anchor-block" onClick={actions.onCancel}>
          Cancel
        </Button>
      </div>
      <div className={`${baseClass}-bottom-bar`}>
        <Button icon="envelope" onClick={actions.onShare}>
          Share
        </Button>
        {isFavorite ? (
          <Button icon="heart" onClick={actions.onFavorite}>
            Unfavorite
          </Button>
        ) : (
          <Button onClick={actions.onFavorite}>{heartOutline}</Button>
        )}
        <Button icon="trash-alt" onClick={actions.onConfirmDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

PhotoView.propTypes = {
  photo: object.isRequired
};

export default PhotoView;
