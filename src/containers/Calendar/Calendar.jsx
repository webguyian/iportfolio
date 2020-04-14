import React from 'react';
import classNames from 'classnames';

import { weekdays } from 'modules/calendar/constants';
import { useCalendar, useGoToToday } from 'modules/calendar/hooks';
import Button from 'components/Button/Button';
import Year from './Year/Year';

const Calendar = () => {
  const [calendar, yearRef, scrollId, yearView, toggleView] = useCalendar();
  const [monthRef, goToToday] = useGoToToday(yearView);
  const baseClass = 'calendar-app';
  const yearViewClass = yearView && `${baseClass}--year-view`;

  return (
    <div className={classNames(baseClass, yearViewClass)}>
      {!yearView && (
        <div className={`${baseClass}-top-bar`}>
          <Button
            icon="chevron-left"
            id={`goto-${scrollId}`}
            onClick={toggleView}
            withLabel
          >
            {scrollId}
          </Button>
          <ul className={`${baseClass}-weekdays`}>
            {weekdays.map(weekday => (
              <li key={weekday.name}>
                <abbr className="ui-weekday" title={weekday.name}>
                  {weekday.abbr}
                </abbr>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul className="ui-years-list" ref={yearRef}>
        {calendar.map((year, index) => (
          <li key={index}>
            <Year
              months={year}
              monthRef={monthRef}
              onMonthClick={toggleView}
              isYearView={yearView}
            />
          </li>
        ))}
      </ul>
      <div className={`${baseClass}-bottom-bar`}>
        <Button onClick={goToToday}>Today</Button>
      </div>
    </div>
  );
};

export default Calendar;
