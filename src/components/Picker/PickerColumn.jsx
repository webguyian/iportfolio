/* eslint-disable no-invalid-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PickerColumn extends Component {
  static propTypes = {
    columnHeight: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      ...this.computeTranslate(props)
    };
  }

  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isMoving } = this.state;

    if (isMoving) {
      return;
    }
    this.setState(this.computeTranslate(nextProps));
  }

  computeTranslate = props => {
    const { options, value, itemHeight, columnHeight } = props;

    let selectedIndex = options.indexOf(value);

    if (selectedIndex < 0) {
      console.warn(
        'Warning: "' +
          this.props.name +
          '" doesn\'t contain an option of "' +
          value +
          '".'
      );
      this.onValueSelected(options[0]);
      selectedIndex = 0;
    }

    return {
      scrollerTranslate:
        columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate:
        columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2
    };
  };

  onValueSelected = newValue => {
    this.props.onChange(this.props.name, newValue);
  };

  handleTouchStart = event => {
    const startTouchY = event.targetTouches[0].pageY;

    this.setState(({ scrollerTranslate }) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate
    }));
  };

  handleTouchMove = event => {
    event.preventDefault();
    const touchY = event.targetTouches[0].pageY;

    this.setState(
      ({
        isMoving,
        startTouchY,
        startScrollerTranslate,
        minTranslate,
        maxTranslate
      }) => {
        if (!isMoving) {
          return {
            isMoving: true
          };
        }

        let nextScrollerTranslate =
          startScrollerTranslate + touchY - startTouchY;

        if (nextScrollerTranslate < minTranslate) {
          nextScrollerTranslate =
            minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
        } else if (nextScrollerTranslate > maxTranslate) {
          nextScrollerTranslate =
            maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
        }
        return {
          scrollerTranslate: nextScrollerTranslate
        };
      }
    );
  };

  handleTouchEnd = () => {
    const { isMoving } = this.state;

    if (!isMoving) {
      return;
    }

    this.setState({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0
    });

    setTimeout(() => {
      const { options, itemHeight } = this.props;
      const { scrollerTranslate, minTranslate, maxTranslate } = this.state;

      let activeIndex;

      if (scrollerTranslate > maxTranslate) {
        activeIndex = 0;
      } else if (scrollerTranslate < minTranslate) {
        activeIndex = options.length - 1;
      } else {
        activeIndex = -Math.floor(
          (scrollerTranslate - maxTranslate) / itemHeight
        );
      }
      this.onValueSelected(options[activeIndex]);
    }, 0);
  };

  handleTouchCancel = () => {
    const { isMoving } = this.state;

    if (!isMoving) {
      return;
    }

    this.setState(startScrollerTranslate => ({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: startScrollerTranslate
    }));
  };

  handleItemClick = option => {
    const { name, value } = this.props;

    if (option !== value) {
      this.onValueSelected(option);
    } else {
      this.props.onClick(name, value);
    }
  };

  get items() {
    const { options, value } = this.props;
    const itemClass = 'picker-item';
    const itemSelectedClass = `${itemClass}--selected`;

    return options.map((option, index) => {
      return (
        <div
          key={index}
          className={classNames(
            itemClass,
            option === value && itemSelectedClass
          )}
          onClick={this.handleItemClick.bind(this, option)}
        >
          {option}
        </div>
      );
    });
  }

  render() {
    const { label } = this.props;
    const { isMoving, scrollerTranslate } = this.state;
    const style = {
      transform: `translate3d(0, ${scrollerTranslate}px, 0)`
    };

    if (isMoving) {
      style.transitionDuration = '0ms';
    }

    return (
      <div className="picker-column">
        {label && <span className="picker-column-label">{label}</span>}
        <div
          className="picker-scroller"
          style={style}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
        >
          {this.items}
        </div>
      </div>
    );
  }
}

export default PickerColumn;
