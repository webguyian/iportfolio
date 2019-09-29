import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

class AppIcon extends Component {
  static propTypes = {
    name: PropTypes.string
  };

  render() {
    const { name } = this.props;

    return (
      <Button className="ui-app-icon">
        <Text className="ui-app-icon-label">{name}</Text>
      </Button>
    );
  }
}

export default AppIcon;
