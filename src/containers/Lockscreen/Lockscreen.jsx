import React, { Component } from 'react';

import Text from 'components/Text/Text';

class Lockscreen extends Component {
  render() {
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
      <div>
        <Text className="ui-clock" element="h1" type="display">
          {time}
        </Text>
        <Text className="ui-date" element="h1" type="display">
          {date}
        </Text>
      </div>
    );
  }
}

export default Lockscreen;
