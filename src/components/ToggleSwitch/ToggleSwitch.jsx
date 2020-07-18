import React, { useState } from 'react';
import { func, string } from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

const ToggleSwitch = props => {
  const { label, onUpdate } = props;
  const [checked, setChecked] = useState(false);
  const baseClass = 'ui-toggle-switch';
  const activeClass = checked ? `${baseClass}--active` : false;

  const handleChange = ({ target }) => {
    setChecked(target.checked);
  };

  return (
    <label className={classNames(baseClass, activeClass)}>
      <input
        className={`${baseClass}-checkbox`}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <Button className={`${baseClass}-slider`} onTransitionEnd={onUpdate} />
      <Text className={`${baseClass}-label`}>{label}</Text>
    </label>
  );
};

ToggleSwitch.propTypes = {
  label: string,
  onUpdate: func.isRequired
};

ToggleSwitch.defaultProps = {
  label: 'slide to unlock'
};

export default ToggleSwitch;
