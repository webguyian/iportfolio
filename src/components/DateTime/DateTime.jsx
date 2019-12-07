import { Component } from 'react';
import PropTypes from 'prop-types';
import { format as formatDate, isToday, isYesterday } from 'date-fns';

class DateTime extends Component {
  static propTypes = {
    children: PropTypes.node,
    format: PropTypes.string,
    fromNow: PropTypes.bool,
    onUpdate: PropTypes.func,
    relativeFormat: PropTypes.string,
    yesterdayLabel: PropTypes.string
  };

  static defaultProps = {
    fromNow: false,
    relativeFormat: 'M/d/yy',
    yesterdayLabel: 'Yesterday'
  };

  constructor(props) {
    super(props);

    this.tick = this.tick.bind(this);

    this.state = {
      millis: props.children || Date.now(),
      request: 0
    };
  }

  componentDidMount() {
    const { children } = this.props;

    if (!children) {
      this.setState({
        request: requestAnimationFrame(this.tick)
      });
    }
  }

  componentWillUnmount() {
    const { request } = this.state;

    cancelAnimationFrame(request);
  }

  get date() {
    const { format, fromNow, relativeFormat, yesterdayLabel } = this.props;
    const { millis } = this.state;
    const date = new Date(millis);

    if (fromNow) {
      if (isYesterday(date)) {
        return yesterdayLabel;
      }

      const updatedFormat = isToday(date) ? format : relativeFormat;

      return formatDate(date, updatedFormat);
    }

    return formatDate(date, format);
  }

  tick() {
    const { onUpdate } = this.props;
    const millis = Date.now();

    this.setState({
      millis,
      request: requestAnimationFrame(this.tick)
    });

    if (onUpdate) {
      onUpdate(millis);
    }
  }

  render() {
    return this.date;
  }
}

export default DateTime;
