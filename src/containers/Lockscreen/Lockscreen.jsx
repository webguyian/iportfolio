import React, { Component } from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';

import DateTime from 'components/DateTime/DateTime';
import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

class Lockscreen extends Component {
  constructor(props) {
    super(props);

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleUnlock = this.handleUnlock.bind(this);

    this.state = {
      redirect: false,
      unlocked: false
    };
  }

  handleRedirect() {
    this.setState(() => ({
      redirect: true
    }));
  }

  handleUnlock() {
    this.setState(() => ({
      unlocked: true
    }));
  }

  render() {
    const { redirect, unlocked } = this.state;
    const baseClass = 'iportfolio-lockscreen';
    const unlockedClass = unlocked && `${baseClass}--unlocked`;

    return (
      <div
        className={classNames(baseClass, unlockedClass)}
        onTransitionEnd={this.handleRedirect}
      >
        <header className={`${baseClass}-header`}>
          <Icon name="lock" size="2x" />
          <Text className="ui-clock" element="h1" type="display">
            <DateTime format="H:mm" />
          </Text>
          <Text className="ui-date" element="h1" type="display">
            <DateTime format="dddd, MMMM D" />
          </Text>
        </header>
        <ToggleSwitch onUpdate={this.handleUnlock} />
        {redirect && <Redirect to="/home" />}
      </div>
    );
  }
}

export default Lockscreen;
