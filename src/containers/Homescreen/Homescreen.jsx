import React, { Component } from 'react';

import AppIcon from 'components/AppIcon/AppIcon';
import Clock from 'components/Clock/Clock';
import DateTime from 'components/DateTime/DateTime';
import Text from 'components/Text/Text';

class Homescreen extends Component {
  get calendarIcon() {
    return (
      <AppIcon name="Calendar">
        <Text className="ui-app-icon-weekday">
          <DateTime format="dddd" />
        </Text>
        <Text className="ui-app-icon-day">
          <DateTime format="D" />
        </Text>
      </AppIcon>
    );
  }

  get clockIcon() {
    return (
      <AppIcon name="Clock">
        <Clock />
      </AppIcon>
    );
  }

  get dock() {
    return (
      <div className="iportfolio-dock">
        <AppIcon />
        <AppIcon />
        <AppIcon />
        <AppIcon />
      </div>
    );
  }

  get grid() {
    return (
      <div className="iportfolio-grid">
        {this.calendarIcon}
        {this.clockIcon}
        <AppIcon name="Maps" />
        <AppIcon name="Weather" />
        <AppIcon name="Reminders" />
        <AppIcon name="Notes" />
        <AppIcon name="Calculator" />
        <AppIcon name="Stocks" />
        <AppIcon name="Photo Booth" />
        <AppIcon name="Settings" />
      </div>
    );
  }

  render() {
    return (
      <div className="iportfolio-homescreen">
        {this.grid}
        {this.dock}
      </div>
    );
  }
}

export default Homescreen;
