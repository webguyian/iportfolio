import React, { Component } from 'react';

import Homescreen from 'containers/Homescreen/Homescreen';

class HomescreenView extends Component {
  render() {
    return <Homescreen {...this.props} />;
  }
}

export default HomescreenView;
