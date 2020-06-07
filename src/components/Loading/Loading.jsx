import React from 'react';
import { string } from 'prop-types';

import Text from 'components/Text/Text';

const Loading = props => {
  const { label } = props;
  const baseClass = 'loading';
  const ticks = new Array(12).fill(null);

  return (
    <div className={`${baseClass}-wrapper`}>
      {label ? <Text>{label}</Text> : <Text type="accessible">Loading...</Text>}
      <div className={baseClass}>
        {ticks.map((_, index) => (
          <div key={index} className={`${baseClass}-tick`}></div>
        ))}
      </div>
    </div>
  );
};

Loading.propTypes = {
  label: string
};

export default Loading;
