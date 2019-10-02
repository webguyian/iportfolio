import { Component } from 'react';
import PropTypes from 'prop-types';

class DateTime extends Component {
  static propTypes = {
    format: PropTypes.string,
    onUpdate: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.tick = this.tick.bind(this);

    this.state = {
      millis: Date.now(),
      request: 0
    };
  }

  componentDidMount() {
    this.setState({
      request: requestAnimationFrame(this.tick)
    });
  }

  componentWillUnmount() {
    const { request } = this.state;

    cancelAnimationFrame(request);
  }

  get date() {
    const { format } = this.props;
    const { millis } = this.state;
    const date = new Date(millis);
    const second = format.endsWith(':ss') ? '2-digit' : undefined;
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second,
      hour12: true
    };
    const fullDate = date.toLocaleString('en-US', options);
    const [weekday, monthAndDay, year, time] = fullDate.split(', ');

    switch (format) {
      case 'H:mm':
      case 'H:mm:ss':
        return time.split(' ')[0];
      case 'dddd':
        return weekday;
      case 'D':
        return monthAndDay.split(' ')[1];
      case 'YYYY':
        return year;
      case 'dddd, MMMM D':
        return `${weekday}, ${monthAndDay}`;
      default:
        return fullDate;
    }
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
