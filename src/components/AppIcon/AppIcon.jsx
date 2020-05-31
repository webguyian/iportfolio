import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import kebabCase from 'lodash/kebabCase';

import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

const AppIcon = props => {
  const { children, id, name, noLabel, theme } = props;
  const baseClass = 'ui-app-icon';
  const nameId = kebabCase(name);
  const nameClass = `${baseClass}--${nameId}`;

  return (
    <div className={classNames(baseClass, nameClass)}>
      <Link
        className={`${baseClass}-link`}
        to={`/${id || nameId}`}
        state={theme ? { theme } : undefined}
      >
        {children}
      </Link>
      {!noLabel && <Text className={`${baseClass}-label`}>{name}</Text>}
    </div>
  );
};

AppIcon.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  theme: PropTypes.string
};

AppIcon.defaultProps = {
  noLabel: false
};

export default AppIcon;
