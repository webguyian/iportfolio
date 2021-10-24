import React from 'react';
import { bool } from 'prop-types';
import cx from 'classnames';

import Text from 'components/Text/Text';

const ToggleCheckbox = props => {
  const { checked, disabled } = props;
  const baseClass = 'ui-toggle-checkbox';
  const disabledClass = disabled && `${baseClass}--disabled`;

  return (
    <label className={cx(baseClass, disabledClass)}>
      <input type="checkbox" defaultChecked={checked} disabled={disabled} />
      <i></i>
      <Text type="accessible">{checked ? 'On' : 'Off'}</Text>
    </label>
  );
};

ToggleCheckbox.propTypes = {
  checked: bool,
  disabled: bool
};

ToggleCheckbox.defaultProps = {
  checked: false,
  disabled: false
};

export default ToggleCheckbox;
