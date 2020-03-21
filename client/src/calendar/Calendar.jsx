/* eslint-disable react/no-array-index-key */
import React from "react";
import moment from "moment";
import Weekdays from "./Weekdays.jsx";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formatContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: false
    };
    // variables
    this.weekdays = moment.weekdays();
    this.short = moment.weekdaysShort();
    this.months = moment.months();

    // bindings
    this.year = this.year.bind(this);
    this.month = this.month.bind(this);
    this.daysInMonth = this.daysInMonth.bind(this);
    this.currentDate = this.currentDate.bind(this);
    this.currentDay = this.currentDay.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
  }

  componentDidMount() {
    this.year()
    this.month()
    this.daysInMonth()
    this.currentDate()
    this.currentDay()
    this.firstDayOfMonth();
  }

  year() {
    return this.state.formatContext.format('Y');
  }

  month() {
    return this.state.formatContext.format('MMMM');
  }

  daysInMonth() {
    return this.state.formatContext.daysInMonth();
  }

  currentDate() {
    return this.state.formatContext.get('date');
  }

  currentDay() {
    return this.state.formatContext.format('D');
  }

  firstDayOfMonth() {
    let { formatContext } = this.state;
    let firstDay = moment(formatContext).startOf('month').format('d');
    return firstDay;
  }




  render() {
    let blankDays = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blankDays.push(<td className="empty-days">{''}</td>);
    }
    let existingDays = [];
    for (let i = 1; i < this.daysInMonth() + 1; i++) {
      let className = (i === this.currentDay() ? "day current-day" : "day");
      existingDays.push(
        <td key={i} className={className}>
          <span>{i}</span>
        </td>
      );
    }
    let daysArray = [...blankDays, ...existingDays];
    let rows = [];
    let cells = [];

    daysArray.forEach((row, i) => {
      if ((i % 7) !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === daysArray.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let allDays = rows.map((day, i) => (
      <tr key={i * Math.random()}>{day}</tr>
    ));

    return (
      <div className="calendar-container">
        <table className="calendar">
          <thead>
            <tr className="calendar-header" />
          </thead>
          <tbody>
            <Weekdays weekdays={this.short} />
            {allDays}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
