import React from 'react';
import PropTypes from 'prop-types';

import PickerColumn from './PickerColumn';

const Picker = props => {
  const {
    labelGroups,
    optionGroups,
    valueGroups,
    itemHeight,
    height,
    onChange,
    onClick
  } = props;
  const style = {
    height: props.height
  };
  const highlightStyle = {
    height: itemHeight,
    marginTop: -(itemHeight / 2)
  };

  return (
    <div className="picker-container" style={style}>
      <div className="picker-inner">
        {Object.keys(optionGroups).map(name => (
          <PickerColumn
            key={name}
            name={name}
            label={labelGroups && labelGroups[name]}
            options={optionGroups[name]}
            value={valueGroups[name]}
            itemHeight={itemHeight}
            columnHeight={height}
            onChange={onChange}
            onClick={onClick}
          />
        ))}
        <div className="picker-highlight" style={highlightStyle}></div>
      </div>
    </div>
  );
};

Picker.propTypes = {
  labelGroups: PropTypes.object,
  optionGroups: PropTypes.object.isRequired,
  valueGroups: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  itemHeight: PropTypes.number,
  height: PropTypes.number
};

Picker.defaultProps = {
  onClick: () => {},
  itemHeight: 36,
  height: 216
};

export default Picker;
