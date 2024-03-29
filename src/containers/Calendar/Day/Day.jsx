import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from 'components/Text/Text';

const Day = props => {
  const { day, isToday } = props;
  const baseClass = 'ui-day';
  const todayClass = isToday && `${baseClass}--today`;

  return (
    <li className={cx(baseClass, todayClass)}>
      {day && <Text className={`${baseClass}-text`}>{day}</Text>}
    </li>
  );
};

Day.propTypes = {
  day: PropTypes.number,
  isToday: PropTypes.bool
};

export default Day;
