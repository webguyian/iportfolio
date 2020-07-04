import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useLockscreen } from 'modules/lockscreen/hooks';

import DateTime from 'components/DateTime/DateTime';
import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

const Lockscreen = props => {
  const { history } = props;
  const [unlocked, handleUnlock] = useLockscreen();
  const baseClass = 'iportfolio-lockscreen';
  const unlockedClass = unlocked && `${baseClass}--unlocked`;
  const handleRedirect = () => {
    if (unlocked) {
      history.push('/home');
    }
  };

  return (
    <div
      className={classNames(baseClass, unlockedClass)}
      onTransitionEnd={handleRedirect}
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
      <ToggleSwitch onUpdate={handleUnlock} />
    </div>
  );
};

Lockscreen.propTypes = {
  history: PropTypes.object
};

export default Lockscreen;
