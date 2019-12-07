import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

import { useRefFocus, useSwipeOffset } from 'containers/Notes/hooks';

const Note = props => {
  const { date, onAdd, onBack, onChange, onDelete, title, text } = props;
  const titleInput = useRefFocus(!title.length);
  const textInput = useRef(null);
  const [handlers, hasOffset] = useSwipeOffset();
  const baseClass = 'note';
  const inputClass = `${baseClass}-input`;
  const textInputClass = `${inputClass}--text`;
  const titleInputClass = `${inputClass}--title`;
  const offsetClass = hasOffset && `${baseClass}-body--offset`;
  const timestampFormat = `MMMM d, yyyy 'at' h:mm a`;

  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      textInput.current.focus();
    }
  };

  return (
    <div className={baseClass}>
      <div className={`${baseClass}-top-bar`}>
        <Link back to="/notes" onClick={onBack} />
      </div>
      <div
        className={classNames(`${baseClass}-body`, offsetClass)}
        {...handlers}
      >
        <Text className={`${baseClass}-timestamp`}>
          <DateTime format={timestampFormat}>{date}</DateTime>
        </Text>
        <input
          className={classNames(inputClass, titleInputClass)}
          onChange={({ target }) => onChange('title', target.value)}
          onKeyUp={handleKeyUp}
          ref={titleInput}
          value={title}
        />
        <textarea
          className={classNames(inputClass, textInputClass)}
          onChange={({ target }) => onChange('text', target.value)}
          ref={textInput}
          value={text}
        />
      </div>
      <div className={`${baseClass}-bottom-bar`}>
        <Button icon="trash" onClick={onDelete}>
          Delete note
        </Button>
        <Button icon="edit" onClick={onAdd}>
          New note
        </Button>
      </div>
    </div>
  );
};

Note.propTypes = {
  date: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string
};

export default Note;
