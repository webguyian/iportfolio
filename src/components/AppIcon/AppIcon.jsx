import React from 'react';
import { bool, node, string } from 'prop-types';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';

import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

const AppIcon = props => {
  const { children, color, id, name, noLabel, noLink, theme } = props;
  const baseClass = 'ui-app-icon';
  const nameId = kebabCase(name);
  const nameClass = `${baseClass}--${nameId}`;
  const style = color ? { backgroundColor: color } : undefined;

  return (
    <div className={cx(baseClass, nameClass)}>
      {noLink ? (
        <Text className={`${baseClass}-link`} style={style}>
          {children}
        </Text>
      ) : (
        <Link
          className={`${baseClass}-link`}
          to={`/${id || nameId}`}
          state={theme ? { theme } : undefined}
        >
          {children}
        </Link>
      )}
      {!noLabel && <Text className={`${baseClass}-label`}>{name}</Text>}
    </div>
  );
};

AppIcon.propTypes = {
  children: node,
  color: string,
  id: string,
  name: string.isRequired,
  noLabel: bool,
  noLink: bool,
  theme: string
};

AppIcon.defaultProps = {
  noLabel: false,
  noLink: false
};

export default AppIcon;
