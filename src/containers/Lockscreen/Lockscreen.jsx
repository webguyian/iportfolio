import React from 'react';
import classNames from 'classnames';

import DateTime from 'components/DateTime/DateTime';
import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

import { useLockscreen } from 'modules/lockscreen/hooks';

const Lockscreen = () => {
  const [unlocked, handleToggle, handleUnlock] = useLockscreen();
  const baseClass = 'iportfolio-lockscreen';
  const unlockedClass = unlocked && `${baseClass}--unlocked`;

  return (
    <div
      className={classNames(baseClass, unlockedClass)}
      onTransitionEnd={handleUnlock}
    >
      <header className={`${baseClass}-header`}>
        <Icon name="lock" size="2x" />
        <Text className="ui-clock" element="h1">
          <DateTime />
        </Text>
        <Text className="ui-date" element="h1">
          <DateTime format="EEEE, MMMM d" />
        </Text>
      </header>
      <ToggleSwitch onUpdate={handleToggle} />
    </div>
  );
};

export default Lockscreen;
