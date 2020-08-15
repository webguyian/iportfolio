import {
  format,
  formatDistanceToNowStrict,
  differenceInCalendarWeeks,
  toDate
} from 'date-fns';

export const formatDate = date => format(date, `MMM d, yyyy 'at' h:mm a`);

export const getCreatedDate = photo => {
  if (!photo) {
    return null;
  }

  return photo.metadata.dateCreated;
};

export const formatCreatedDate = photo => {
  return formatDate(getCreatedDate(photo));
};

export const formatCreatedDateRelative = photo => {
  const date = toDate(getCreatedDate(photo));
  const options = { addSuffix: true };
  const differentWeek = differenceInCalendarWeeks(new Date(), date);

  if (differentWeek < 2) {
    return formatDistanceToNowStrict(date, options);
  }

  return formatDate(date);
};

export const getPhotoIndex = location => {
  const match = location && location.pathname.match(/\d+/);

  if (!match) {
    return;
  }

  return Number(match[0]);
};
