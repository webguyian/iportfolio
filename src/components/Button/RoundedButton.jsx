import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';

const RoundedButton = props => {
  const baseClass = 'ui-btn--rounded';

  return (
    <Button {...props} className={classNames(baseClass, props.className)} />
  );
};

RoundedButton.propTypes = {
  className: PropTypes.string
};

export default RoundedButton;
