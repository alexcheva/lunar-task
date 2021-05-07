import * as React from "react";

// import dayGridPlugin from "@fullcalendar/daygrid";
// import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const Calendar = () => {
  const [month, setMonth] = React.useState(dayjs());
  const [daysInMonth, setDaysInMonth] = React.useState(month.daysInMonth());
  const dates = [];
  for (let i = 0; i < daysInMonth; i++) {
    dates.push(month.date(i));
  }
  console.log(dates);
  //link to days
  //   Get the number of days in the current month.
  //     dayjs('2019-01-25').daysInMonth()
  //pass in the date props
  //make different routes to the specific days
  //switch between months
  const changeMonthValue = (addValue) => {
    setMonth(month.add(addValue, "month"));
  };
  return (
    <section>
      <button onClick={() => changeMonthValue(-1)}>
        <i className="bi bi-arrow-left-circle"></i>
      </button>{" "}
      {month.format("MMMM YYYY")}{" "}
      <button onClick={() => changeMonthValue(1)}>
        <i className="bi bi-arrow-right-circle"></i>
      </button>
      <CardGroup>
        {dates.map((date, i) => (
          <DayOfMonth date={date} key={i} />
        ))}
      </CardGroup>
    </section>
  );
};
{
  /* <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" /> */
}
const DayOfMonth = ({ date }) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://www.icalendar37.net/lunar/api/i.png"
      />
      <Card.Body>
        <Card.Title>{date.format("ddd MMM D")}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
