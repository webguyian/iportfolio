import { Component } from 'react';
import PropTypes from 'prop-types';

class DateTime extends Component {
  static propTypes = {
    format: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.tick = this.tick.bind(this);

    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  get date() {
    const { format } = this.props;
    const { date } = this.state;
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    const fullDate = date.toLocaleString('en-US', options);
    const [weekday, monthAndDay, year, time] = fullDate.split(', ');

    switch (format) {
      case 'H:mm':
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
    this.setState(() => ({
      date: new Date()
    }));
  }

  render() {
    return this.date;
  }
}

export default DateTime;
