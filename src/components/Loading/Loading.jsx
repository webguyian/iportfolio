import React from 'react';

import Text from 'components/Text/Text';

const Loading = () => {
  const baseClass = 'loading';
  const ticks = new Array(12).fill(null);

  return (
    <div className={baseClass}>
      <Text type="accessible">Loading...</Text>
      {ticks.map((_, index) => (
        <div key={index} className={`${baseClass}-tick`}></div>
      ))}
    </div>
  );
};

export default Loading;
