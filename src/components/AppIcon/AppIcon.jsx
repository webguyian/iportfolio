import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import kebabCase from 'lodash/kebabCase';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

const AppIcon = props => {
  const { children, id, name, noLabel } = props;
  const baseClass = 'ui-app-icon';
  const nameId = kebabCase(name);
  const nameClass = `${baseClass}--${nameId}`;
  const history = useHistory();
  const redirect = () => history.push(`/${id || nameId}`);

  return (
    <div className={classNames(baseClass, nameClass)}>
      <Button className={`${baseClass}-button`} onClick={redirect}>
        {children}
      </Button>
      {!noLabel && <Text className={`${baseClass}-label`}>{name}</Text>}
    </div>
  );
};

AppIcon.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool
};

AppIcon.defaultProps = {
  noLabel: false
};

export default AppIcon;
