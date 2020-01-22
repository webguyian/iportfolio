import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MediaBlock = props => {
  const { align, alt, children, className, src } = props;
  const baseClass = 'ui-media-block';
  const alignClass = `${baseClass}--${align}`;
  const isLeft = align === 'left';
  const imgProps = {
    className: `${baseClass}-image`,
    alt,
    src
  };

  return (
    <div className={classNames(baseClass, alignClass, className)}>
      {src && isLeft ? <img {...imgProps} /> : null}
      <div className={`${baseClass}-content`}>{children}</div>
      {src && !isLeft ? <img {...imgProps} /> : null}
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
