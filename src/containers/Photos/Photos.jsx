import React from 'react';
import { object } from 'prop-types';

import TabNavigation from 'components/TabNavigation/TabNavigation';
import PhotoGallery from './PhotoGallery/PhotoGallery';

import { useInitialRoute } from 'modules/browser/hooks';

export const FavoritesGallery = props => (
  <PhotoGallery {...props} favoritesOnly />
);

const Photos = props => {
  const { location, match } = props;
  const galleryPath = `${match.path}/gallery`;
  const favoritesPath = `${match.path}/favorites`;
  const isMainRoute = [galleryPath, favoritesPath].includes(location.pathname);
  const tabs = [
    {
      path: galleryPath,
      icon: 'images',
      label: 'Photos',
      component: PhotoGallery
    },
    {
      path: favoritesPath,
      icon: 'heart',
      label: 'Favorites',
      component: FavoritesGallery
    }
  ];
  const baseClass = 'photos-app';

  useInitialRoute(match, tabs[0].path);

  return (
    <div className={baseClass}>
      <TabNavigation showNav={isMainRoute} tabs={tabs} />
    </div>
  );
};

Photos.propTypes = {
  location: object.isRequired,
  match: object.isRequired
};

export default Photos;
