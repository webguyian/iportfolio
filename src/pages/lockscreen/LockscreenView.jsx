import React, { Component } from 'react';

import Lockscreen from 'containers/Lockscreen/Lockscreen';

class LockscreenView extends Component {
  render() {
    return <Lockscreen {...this.props} />;
  }
}

export default LockscreenView;
