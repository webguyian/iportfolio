import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getWeeks, isCurrentMonth } from 'modules/calendar/helpers';
import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import Week from 'containers/Calendar/Week/Week';

const Month = props => {
  const { isYearView, month, onClick } = props;
  const { monthAbbr, offset, year } = month[0];
  const currentMonth = isCurrentMonth(month);
  const weeks = getWeeks(month);
  const baseClass = 'ui-month';
  const currentMonthClass = currentMonth && `${baseClass}--current`;
  const className = classNames(baseClass, currentMonthClass);
  const titleClass = `${baseClass}-title`;
  const offsetClass = `${titleClass}--offset-${offset}`;

  const id = `${monthAbbr.toLowerCase()}-${year}`;
  const render = () => (
    <Fragment>
      <Text
        className={classNames(titleClass, offsetClass)}
        element="h2"
        modifier="bold"
      >
        {monthAbbr}
      </Text>
      <ul className={`${baseClass}-list`}>
        {weeks.map((week, i) => (
          <li key={i}>
            <Week days={week} />
          </li>
        ))}
      </ul>
    </Fragment>
  );

  if (isYearView) {
    return (
      <Button className={className} id={id} onClick={onClick}>
        {render()}
      </Button>
    );
  }

  return (
    <div className={className} id={id}>
      {render()}
    </div>
  );
};

Month.propTypes = {
  isYearView: PropTypes.bool,
  month: PropTypes.array.isRequired,
  onClick: PropTypes.func
};

export default Month;
