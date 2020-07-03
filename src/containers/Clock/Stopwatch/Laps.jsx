import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getLapIndex } from 'modules/clock/helpers';

import Lap from './Lap';

const Laps = props => {
  const { laps } = props;
  const filteredLaps = laps.slice(1, laps.length).filter(lap => lap > 0);
  const min = Math.min(...filteredLaps);
  const max = Math.max(...filteredLaps);
  const lapListClass = 'lap-list';
  const lapItemClass = `${lapListClass}-item`;
  const maxClass = `${lapItemClass}--max`;
  const minClass = `${lapItemClass}--min`;

  return (
    <ul className={lapListClass}>
      {laps.map((lap, index) => (
        <li
          className={classNames(`${lapListClass}-item`, {
            [maxClass]: lap === max,
            [minClass]: lap === min
          })}
          key={`${lap}_${index}`}
        >
          <Lap index={getLapIndex(index, laps)} time={lap} />
        </li>
      ))}
    </ul>
  );
};

Laps.propTypes = {
  laps: PropTypes.array.isRequired
};

export default Laps;
