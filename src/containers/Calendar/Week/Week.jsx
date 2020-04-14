import React from 'react';
import PropTypes from 'prop-types';

import Day from 'containers/Calendar/Day/Day';

const Week = props => {
  const { days } = props;
  const baseClass = 'ui-week';

  return (
    <ul className={`${baseClass}-list`}>
      {days.map((day, index) => (
        <Day key={index} {...day} />
      ))}
    </ul>
  );
};

Week.propTypes = {
  days: PropTypes.array.isRequired
};

export default Week;
