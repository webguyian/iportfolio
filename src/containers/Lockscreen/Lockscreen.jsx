import React, { Component } from 'react';
import classNames from 'classnames';

import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

class Lockscreen extends Component {
  constructor(props) {
    super(props);

    this.handleUnlock = this.handleUnlock.bind(this);

    this.state = {
      unlocked: false
    };
  }

  handleUnlock() {
    this.setState(() => ({
      unlocked: true
    }));
  }

  render() {
    const { unlocked } = this.state;
    const baseClass = 'iportfolio-lockscreen';
    const unlockedClass = unlocked && `${baseClass}--unlocked`;
    const dateObj = new Date();
    const [time] = dateObj
      .toLocaleString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      .split(' ');

    const date = dateObj.toLocaleString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className={classNames(baseClass, unlockedClass)}>
        <header className={`${baseClass}-header`}>
          <Icon name="lock" size="2x" />
          <Text className="ui-clock" element="h1" type="display">
            {time}
          </Text>
          <Text className="ui-date" element="h1" type="display">
            {date}
          </Text>
        </header>
        <ToggleSwitch onUpdate={this.handleUnlock} />
      </div>
    );
  }
}

export default Lockscreen;
