import React from 'react';

import AppIcon from 'components/AppIcon/AppIcon';
import Clockface from 'components/Clockface/Clockface';
import DateTime from 'components/DateTime/DateTime';
import Text from 'components/Text/Text';

import * as icons from 'modules/homescreen/constants';

const Homescreen = () => {
  const calendarIcon = () => {
    return (
      <AppIcon name="Calendar">
        <Text className="ui-app-icon-weekday">
          <DateTime format="EE" />
        </Text>
        <Text className="ui-app-icon-day">
          <DateTime format="d" />
        </Text>
      </AppIcon>
    );
  };

  const clockIcon = () => {
    return (
      <AppIcon name="Clock">
        <Clockface />
      </AppIcon>
    );
  };

  const grid = () => {
    return (
      <div className="iportfolio-grid">
        {calendarIcon()}
        {clockIcon()}
        <AppIcon name="Camera">{icons.cameraIcon()}</AppIcon>
        <AppIcon name="Photos">{icons.photosIcon()}</AppIcon>
        <AppIcon name="Music">{icons.musicIcon()}</AppIcon>
        <AppIcon name="Reminders">{icons.remindersIcon()}</AppIcon>
        <AppIcon name="Notes">{icons.notesIcon()}</AppIcon>
        <AppIcon id="map" name="Google Maps" theme="light">
          {icons.mapIcon()}
        </AppIcon>
        <AppIcon name="Weather">{icons.weatherIcon()}</AppIcon>
        <AppIcon name="Stocks">{icons.stocksIcon()}</AppIcon>
        <AppIcon name="Calculator">{icons.calculatorIcon()}</AppIcon>
        <AppIcon name="Settings">{icons.settingsIcon()}</AppIcon>
      </div>
    );
  };

  const dock = () => {
    return (
      <div className="iportfolio-dock">
        <AppIcon name="phone" noLabel theme="black-dark">
          {icons.phoneIcon()}
        </AppIcon>
        <AppIcon name="safari" noLabel>
          {icons.safariIcon()}
        </AppIcon>
        <AppIcon name="mail" noLabel>
          {icons.mailIcon()}
        </AppIcon>
        <AppIcon name="messages" theme="faded-dark" noLabel>
          {icons.messagesIcon()}
        </AppIcon>
      </div>
    );
  };

  return (
    <div className="iportfolio-homescreen">
      {grid()}
      {dock()}
    </div>
  );
};

export default Homescreen;
