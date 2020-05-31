import React from 'react';
import PropTypes from 'prop-types';

const Flip = props => {
  const { back, children } = props;
  const baseClass = 'ui-flip';
  const containerClass = `${baseClass}-container`;
  const frontClass = `${baseClass}-front`;
  const backClass = `${baseClass}-back`;

  return (
    <div className={containerClass}>
      <div className={baseClass}>
        <div className={frontClass}>{children}</div>
        <div className={backClass}>{back}</div>
      </div>
    </div>
  );
};

Flip.propTypes = {
  children: PropTypes.node,
  back: PropTypes.node
};

export default Flip;
