import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from 'components/Button/Button';

const RoundedButton = props => {
  const baseClass = 'ui-btn--rounded';

  return <Button {...props} className={cx(baseClass, props.className)} />;
};

RoundedButton.propTypes = {
  className: PropTypes.string
};

export default RoundedButton;
