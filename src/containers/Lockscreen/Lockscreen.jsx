import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DateTime from 'components/DateTime/DateTime';
import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

const Lockscreen = props => {
  const [unlocked, setUnlocked] = useState(false);
  const baseClass = 'iportfolio-lockscreen';
  const unlockedClass = unlocked && `${baseClass}--unlocked`;

  const handleRedirect = () => {
    const { history } = props;

    history.push('/home');
  };

  const handleUnlock = () => {
    setUnlocked(true);
  };

  return (
    <div
      className={classNames(baseClass, unlockedClass)}
      onTransitionEnd={handleRedirect}
    >
      <header className={`${baseClass}-header`}>
        <Icon name="lock" size="2x" />
        <Text className="ui-clock" element="h1">
          <DateTime format="h:mm" />
        </Text>
        <Text className="ui-date" element="h1">
          <DateTime format="EEEE, MMMM d" />
        </Text>
      </header>
      <ToggleSwitch onUpdate={handleUnlock} />
    </div>
  );
};

Lockscreen.propTypes = {
  history: PropTypes.object
};

export default Lockscreen;
