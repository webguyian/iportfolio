import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

import { useSwipeOffset } from 'modules/reminders/hooks';

const NotePreview = props => {
  const { note, onClick, onDelete } = props;
  const [handlers, offset] = useSwipeOffset(onDelete.bind(null, note.id));
  const baseClass = 'note-preview';
  const swipedClass = offset && `${baseClass}--swiped`;
  const swipingClass = offset > 80 && `${baseClass}--swiping`;
  const noTextMessage = 'No additional text';
  const noTitleMessage = 'New Note';

  const handleClick = () => {
    if (offset) {
      return false;
    }

    onClick(note);
  };

  return (
    <div
      className={classNames(baseClass, swipedClass, swipingClass)}
      {...handlers}
    >
      <Link
        to={{ pathname: `/notes/${note.id}`, state: { id: note.id } }}
        onClick={handleClick}
      >
        <Text
          className={`${baseClass}-title-display`}
          element="h2"
          type="display"
        >
          {note.title || noTitleMessage}
        </Text>
        <div className={`${baseClass}-body`}>
          <Text className={`${baseClass}-date-display`}>
            <DateTime format="h:mm a" fromNow>
              {note.date}
            </DateTime>
          </Text>
          <Text className={`${baseClass}-text-display`}>
            {note.text || noTextMessage}
          </Text>
        </div>
      </Link>
      <Button className="ui-btn--delete" onClick={onDelete.bind(null, note.id)}>
        Delete
      </Button>
    </div>
  );
};

NotePreview.propTypes = {
  note: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default NotePreview;
