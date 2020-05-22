import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { formatTimestamp } from 'modules/stocks/helpers';
import { useStockNews } from 'modules/stocks/hooks';

import Button from 'components/Button/Button';
import Link from 'components/Link/Link';
import MediaBlock from 'components/MediaBlock/MediaBlock';
import Text from 'components/Text/Text';

const StocksNews = props => {
  const { category, displayCount, draggable } = props;
  const [visible, setVisible] = useState(false);
  const news = useStockNews(category);
  const baseClass = 'stock-news';
  const visibleClass = visible && `${baseClass}--visible`;
  const accessibleLabel = visible ? 'drag down' : 'drag up';
  const count = displayCount || (news && news.length);
  const stories = news && news.slice(0, count);
  const handleSlideUp = () => {
    setVisible(visibility => !visibility);
  };

  if (!news || !news.length) {
    return null;
  }

  return (
    <aside className={classNames(baseClass, visibleClass)}>
      {draggable && (
        <Button
          className={`${baseClass}-drag-handle`}
          onClick={handleSlideUp}
          aria-labelledby={baseClass}
        >
          <Text type="accessible">{accessibleLabel}</Text>
        </Button>
      )}
      <header id={baseClass} className={`${baseClass}-header`}>
        {!category && (
          <Text className={`${baseClass}-title`} element="h1" type="display">
            Business News
          </Text>
        )}
        <Text className={`${baseClass}-author`} element="h2">
          from Finnhub
        </Text>
      </header>
      {news && (
        <ul className={`${baseClass}-list`}>
          {stories.map(story => (
            <li key={story.id} className={`${baseClass}-list-item`}>
              <Link to={story.url} external>
                <MediaBlock align="right" src={story.image}>
                  <Text className={`${baseClass}-source`} type="display">
                    {story.source}
                  </Text>
                  <Text className={`${baseClass}-headline`}>
                    {story.headline}
                  </Text>
                  <Text className={`${baseClass}-timestamp`}>
                    {formatTimestamp(story.datetime)}
                  </Text>
                </MediaBlock>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

StocksNews.propTypes = {
  category: PropTypes.string,
  displayCount: PropTypes.number,
  draggable: PropTypes.bool
};

StocksNews.defaultProps = {
  draggable: false
};

export default StocksNews;
