import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const MediaBlock = props => {
  const { align, alt, children, className, src } = props;
  const baseClass = 'ui-media-block';
  const alignClass = `${baseClass}--${align}`;
  const isLeft = align === 'left';
  const hasSecureSrc = src && src.startsWith('https');
  const imgProps = {
    className: `${baseClass}-image`,
    alt,
    src
  };

  return (
    <div className={cx(baseClass, alignClass, className)}>
      {hasSecureSrc && isLeft ? <img {...imgProps} /> : null}
      <div className={`${baseClass}-content`}>{children}</div>
      {hasSecureSrc && !isLeft ? <img {...imgProps} /> : null}
    </div>
  );
};

MediaBlock.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  alt: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  src: PropTypes.string
};

MediaBlock.defaultProps = {
  align: 'left'
};

export default MediaBlock;
