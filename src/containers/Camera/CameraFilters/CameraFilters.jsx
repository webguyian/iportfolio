import React from 'react';
import { object, func, string } from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

import { getMobileOperatingSystem } from 'modules/browser/helpers';

if (getMobileOperatingSystem() === 'iOS') {
  require('context-filter-polyfill');
}

const CameraFilters = props => {
  const { activeFilter, filters, onFilterClick } = props;
  const baseClass = 'camera-filters';
  const filterClass = 'camera-filter';
  const activeClass = `${filterClass}--active`;
  const canvasClass = `${filterClass}-canvas`;

  return (
    <div className={baseClass}>
      <Text className={`${filterClass}-label`} type="display">
        {activeFilter}
      </Text>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <filter id="svgThreshold">
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues=" 0 1 1 1" />
            <feFuncG type="discrete" tableValues=" 0 1 1 1" />
            <feFuncB type="discrete" tableValues=" 0 1 1 1" />
          </feComponentTransfer>
        </filter>
        <filter id="svgSharpen">
          <feConvolveMatrix
            order="3 3"
            preserveAlpha="true"
            divisor="1"
            bias="0"
            kernelMatrix="-1,-1,-1 -1,9,-1 -1,-1,-1"
          />
        </filter>
      </svg>
      <div className={`${filterClass}-list`}>
        {filters.current.map(filter => (
          <Button
            className={classNames(
              filterClass,
              filter.label === activeFilter && activeClass
            )}
            key={filter.label}
            onClick={onFilterClick.bind(null, filter)}
            aria-label={filter.label}
          >
            <canvas
              className={canvasClass}
              ref={el => (filter.ref = el)}
              width={75}
              height={75}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

CameraFilters.propTypes = {
  activeFilter: string,
  filters: object.isRequired,
  onFilterClick: func.isRequired
};

export default CameraFilters;
