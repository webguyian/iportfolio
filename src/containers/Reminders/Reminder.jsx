import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import { useRefControlledFocus, useSwipeOffset } from './hooks';

const Reminder = props => {
  const { checked, focused, id, onAdd, onDelete, onUpdate, value } = props;
  const [handlers, offset] = useSwipeOffset(onDelete.bind(null, id));
  const inputEl = useRefControlledFocus(focused);
  const baseClass = 'reminder';
  const checkedClass = checked && `${baseClass}--checked`;
  const swipedClass = offset && `${baseClass}--swiped`;
  const swipingClass = offset > 80 && `${baseClass}--swiping`;

  const handleChange = event => {
    onUpdate({ id, checked, value: event.target.value });
  };

  const handleCheck = () => {
    onUpdate({ id, checked: !checked, value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAdd(id);
  };

  return (
    <form
      className={classNames(baseClass, checkedClass, swipedClass, swipingClass)}
      onSubmit={handleSubmit}
      {...handlers}
    >
      <div className={`${baseClass}-field`}>
        <input
          className={`${baseClass}-checkbox`}
          id={`${baseClass}-${id}`}
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
        />
        <label className={`${baseClass}-label`} htmlFor={`${baseClass}-${id}`}>
          <Text type="accessible">Toggle checkbox</Text>
        </label>
        <input
          className={`${baseClass}-input`}
          type="text"
          value={value}
          onChange={handleChange}
          ref={inputEl}
        />
      </div>
      <Button className="ui-btn--delete" onClick={onDelete.bind(null, id)}>
        Delete
      </Button>
    </form>
  );
};

Reminder.propTypes = {
  checked: PropTypes.bool,
  focused: PropTypes.bool,
  id: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.string
};

Reminder.defaultProps = {
  checked: false,
  focused: false,
  value: ''
};

export default Reminder;
