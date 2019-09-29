import React, { Component } from 'react';

import AppIcon from 'components/AppIcon/AppIcon';

class Homescreen extends Component {
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
        <AppIcon name="Calendar" />
        <AppIcon name="Clock" />
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
