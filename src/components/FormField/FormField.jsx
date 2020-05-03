import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormField = props => {
  const {
    className,
    id,
    label,
    disabled,
    onChange,
    type,
    value,
    ...otherProps
  } = props;
  const isTextarea = type === 'textarea';
  const baseClass = 'ui-form-field';
  const handleChange = event => {
    const newValue = event.target.value;

    onChange(id, newValue, event);
  };

  if (isTextarea) {
    return (
      <div className={classNames(baseClass, className)}>
        <textarea
          className={`${baseClass}-textarea`}
          id={id}
          value={value}
          onChange={handleChange}
          {...otherProps}
        />
      </div>
    );
  }

  return (
    <div className={baseClass}>
      <label className={`${baseClass}-label`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${baseClass}-input`}
        id={id}
        disabled={disabled}
        autoComplete="off"
        onChange={handleChange}
        readOnly={Boolean(!onChange)}
        type={type}
        value={value}
        {...otherProps}
      />
    </div>
  );
};

FormField.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string
};

FormField.defaultProps = {
  disabled: false,
  type: 'text',
  value: ''
};

export default FormField;
