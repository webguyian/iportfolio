import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';

class ToggleSwitch extends Component {
  static propTypes = {
    label: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    label: 'slide to unlock'
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      checked: false
    };
  }

  handleChange({ target }) {
    this.setState(() => ({
      checked: target.checked
    }));
  }

  render() {
    const { label, onUpdate } = this.props;
    const { checked } = this.state;
    const baseClass = 'ui-toggle-switch';
    const activeClass = checked ? `${baseClass}--active` : false;

    return (
      <label className={classNames(baseClass, activeClass)}>
        <input
          className={`${baseClass}-checkbox`}
          type="checkbox"
          checked={checked}
          onChange={this.handleChange}
        />
        <Button className={`${baseClass}-slider`} onTransitionEnd={onUpdate} />
        <Text className={`${baseClass}-label`}>{label}</Text>
      </label>
    );
  }
}

export default ToggleSwitch;
