import React from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import cx from 'classnames';

import Icon from 'components/Icon/Icon';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';
import WeatherDetail from './WeatherDetail/WeatherDetail';
import WeatherList from './WeatherList/WeatherList';

import { useCurrentWeather } from 'modules/weather/hooks';

const Weather = () => {
  const [current, city] = useCurrentWeather();
  const location = useLocation();
  const match = useRouteMatch('/weather');
  const listMatch = useRouteMatch('/weather/list');
  const currentCity = current ? { ...current, city } : null;
  const data = (location.state && location.state.data) || currentCity;
  const isDetail = match && match.isExact;
  const baseClass = 'weather-app';
  const detailClass = isDetail && `${baseClass}--detail`;

  return (
    <div className={cx(baseClass, detailClass)}>
      {listMatch && <WeatherList current={currentCity} />}
      {isDetail && <WeatherDetail data={data} />}
      {!data && (
        <Text className="ui-text--loading" element="p">
          Loading...
        </Text>
      )}
      <div className="weather-app-bottom-bar">
        <Link to="https://darksky.net/poweredby/" external>
          <svg
            className="ui-icon ui-icon-dark-sky"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
          >
            <path d="M 485 165 C 526 154 568 149 597 147 545 68 512 18 496 0 496 0 493 61 371 210 393 198 438 177 485 165 Z"></path>
            <path d="M 460 868 C 434 800 427 722 427 722 L 387 745 C 387 745 368 680 361 614 354 550 361 486 361 486 L 308 507 C 308 507 304 430 317 356 325 307 340 261 349 236 348 238 346 240 344 242 236 367 144 491 144 644 144 841 303 1000 499 1000 509 1000 519 1000 529 999 513 974 481 923 460 868 Z"></path>
            <path d="M 643 216 C 631 198 620 181 610 166 590 187 561 222 537 259 502 312 482 370 482 370 L 560 346 C 560 346 519 417 499 491 480 555 482 624 482 624 L 536 599 C 536 599 512 688 510 792 508 883 526 965 535 998 714 980 853 829 855 644 856 484 739 359 643 216 Z"></path>
          </svg>
        </Link>
        {isDetail && (
          <Link to="/weather/list">
            <Icon name="list" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Weather;
