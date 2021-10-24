import React from 'react';
import cx from 'classnames';

import LinkList from 'components/LinkList/LinkList';
import SearchField from 'components/SearchField/SearchField';
import Text from 'components/Text/Text';

import { favorites, frequents } from 'modules/safari/constants';
import { useWebSearch } from 'modules/safari/hooks';

const Safari = () => {
  const [actions, hasSearch] = useWebSearch();
  const baseClass = 'safari-app';
  const searchClass = hasSearch && `${baseClass}--with-search`;

  return (
    <div className={cx(baseClass, searchClass)}>
      <SearchField placeholder="Search or enter website name" {...actions} />
      <div className={`${baseClass}-content`}>
        <Text element="h1" type="display">
          Favorites
        </Text>
        <LinkList links={favorites} />
        <Text element="h2" type="display">
          Frequently Visited
        </Text>
        <LinkList links={frequents} />
      </div>
    </div>
  );
};

export default Safari;
