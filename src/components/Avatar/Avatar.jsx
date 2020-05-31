import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text/Text';

const Avatar = props => {
  const { alt, src, text } = props;
  const baseClass = 'ui-avatar';
  const imageClass = `${baseClass}-image`;
  const textClass = `${baseClass}-text`;

  return (
    <div className={baseClass}>
      {src && <img className={imageClass} alt={alt} src={src} />}
      {text && (
        <Text className={textClass} modifier="light">
          {text}
        </Text>
      )}
    </div>
  );
};

Avatar.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  text: PropTypes.string
};

export default Avatar;
