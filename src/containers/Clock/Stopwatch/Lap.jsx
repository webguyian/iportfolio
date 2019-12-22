import React from 'react';
import PropTypes from 'prop-types';

import DateTime from 'components/DateTime/DateTime';
import Text from 'components/Text/Text';

import { timeFormat } from 'containers/Clock/constants';
import { getTimeDisplay } from 'containers/Clock/helpers';

const Lap = props => {
  const { index, label, time } = props;
  const baseClass = 'lap';
  const fromDate = getTimeDisplay(time);

  if (!time) {
    return null;
  }

  return (
    <div className={baseClass}>
      <Text className={`${baseClass}-label`}>
        {label} {index}
      </Text>
      <Text className={`${baseClass}-time`}>
        <DateTime format={timeFormat} fromDate={fromDate} stopped />
      </Text>
    </div>
  );
};

Lap.propTypes = {
  index: PropTypes.number,
  label: PropTypes.string,
  time: PropTypes.number
};

Lap.defaultProps = {
  label: 'Lap'
};

export default Lap;
