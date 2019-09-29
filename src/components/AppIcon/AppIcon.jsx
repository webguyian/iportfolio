import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import DateTime from 'components/DateTime/DateTime';
import Text from 'components/Text/Text';

class AppIcon extends Component {
  static propTypes = {
    name: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.baseClass = 'ui-app-icon';
  }

  get calendarIcon() {
    const { name } = this.props;

    return (
      <Button className={this.baseClass}>
        <Text className={`${this.baseClass}-weekday`}>
          <DateTime format="dddd" />
        </Text>
        <Text className={`${this.baseClass}-day`}>
          <DateTime format="D" />
        </Text>
        <Text className="ui-app-icon-label">{name}</Text>
      </Button>
    );
  }

  render() {
    const { name } = this.props;

    if (name === 'Calendar') {
      return this.calendarIcon;
    }

    return (
      <Button className={this.baseClass}>
        <Text className={`${this.baseClass}-label`}>{name}</Text>
      </Button>
    );
  }
}

export default AppIcon;
