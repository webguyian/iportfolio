import React from 'react';
import PropTypes from 'prop-types';

import { isCurrentMonth } from 'modules/calendar/helpers';
import Text from 'components/Text/Text';
import Month from 'containers/Calendar/Month/Month';

const Year = props => {
  const { isYearView, months, monthRef, onMonthClick } = props;
  const yearClass = 'ui-year';
  const [firstDay] = months[0];
  const year = firstDay.year;

  return (
    <div className={yearClass} id={`year-${year}`}>
      {isYearView && (
        <Text className={`${yearClass}-title`} type="display" element="h1">
          {year}
        </Text>
      )}
      <ul className={`${yearClass}-list`}>
        {months.map((month, index) => {
          const ref = isCurrentMonth(month) ? monthRef : undefined;

          return (
            <li key={index} ref={ref}>
              <Month
                isYearView={isYearView}
                month={month}
                onClick={onMonthClick}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Year.propTypes = {
  isYearView: PropTypes.bool,
  months: PropTypes.array.isRequired,
  monthRef: PropTypes.object,
  onMonthClick: PropTypes.func
};

export default Year;
