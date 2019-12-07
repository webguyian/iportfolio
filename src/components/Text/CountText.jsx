import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text/Text';

const CountText = props => {
  const { children, count, emptyLabel, ...otherProps } = props;

  if (count === 1) {
    const label = children.slice(0, children.length - 1);

    return <Text {...otherProps}>{`${count} ${label}`}</Text>;
  }

  return <Text {...otherProps}>{`${count || emptyLabel} ${children}`}</Text>;
};

CountText.propTypes = {
  children: PropTypes.node.isRequired,
  count: PropTypes.number,
  emptyLabel: PropTypes.string
};

CountText.defaultProps = {
  count: 0,
  emptyLabel: 'No'
};

export default CountText;
