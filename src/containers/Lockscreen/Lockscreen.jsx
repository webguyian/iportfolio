import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DateTime from 'components/DateTime/DateTime';
import Icon from 'components/Icon/Icon';
import Text from 'components/Text/Text';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

class Lockscreen extends Component {
  static propTypes = {
    history: PropTypes.object
  };

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
    const { history } = this.props;

    history.push('/home');
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
      </div>
    );
  }
}

export default Lockscreen;
