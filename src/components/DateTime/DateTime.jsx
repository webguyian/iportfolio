import { node, string, object, bool, func } from 'prop-types';
import { format as formatDate, isToday, isYesterday } from 'date-fns';

import { useDateTime } from 'modules/datetime/hooks';

const DateTime = props => {
  const {
    children,
    format,
    fromDate,
    fromNow,
    relativeFormat,
    stopped,
    onUpdate,
    yesterdayLabel
  } = props;
  const millis = useDateTime(stopped, onUpdate, children);
  const date = new Date(millis);

  if (fromNow) {
    if (isYesterday(date)) {
      return yesterdayLabel;
    }

    const updatedFormat = isToday(date) ? format : relativeFormat;

    return formatDate(date, updatedFormat);
  }

  if (fromDate) {
    return formatDate(fromDate, format);
  }

  return formatDate(date, format);
};

DateTime.propTypes = {
  children: node,
  format: string,
  fromDate: object,
  fromNow: bool,
  onUpdate: func,
  relativeFormat: string,
  stopped: bool,
  yesterdayLabel: string
};

DateTime.defaultProps = {
  format: 'h:mm',
  fromNow: false,
  relativeFormat: 'M/d/yy',
  stopped: false,
  yesterdayLabel: 'Yesterday'
};

export default DateTime;
