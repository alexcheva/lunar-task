import * as React from "react";

// import dayGridPlugin from "@fullcalendar/daygrid";
// import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";

const Calendar = ({ data }) => {
  const [month, setMonth] = React.useState(dayjs());
  const [daysInMonth, setDaysInMonth] = React.useState(month.daysInMonth());

  const dates = [];
  const svgs = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(month.date(i));
    svgs.push(data.phase[dates[i - 1].date()].svg);
  }
  console.log(data.phase[1]);
  const first_day_week_sunday = false;
  let inc = 0;
  if (first_day_week_sunday) {
    inc = 1;
    data.nameDay.unshift(data.nameDay.pop());
  }
  const empty_initial_boxes = Number(data.phase[1].dayWeek) + inc;
  console.log(empty_initial_boxes);
  const number_days_month = Number(data.daysMonth);
  const total_boxes =
    Math.ceil((empty_initial_boxes + number_days_month) / 7) * 7;
  console.log(total_boxes);
  //link to days
  //pass in the date props
  //make different routes to the specific days
  //switch between months
  const changeMonthValue = (addValue) => {
    setMonth(month.add(addValue, "month"));
    setDaysInMonth(month.daysInMonth());
  };
  const emptyInitialCards = [];
  for (let i = 0; i < empty_initial_boxes; i++) {
    emptyInitialCards.push(`<Card key={0${i}}></Card>`);
  }
  console.log(emptyInitialCards);
  return (
    <section>
      <h2>
        <button onClick={() => changeMonthValue(-1)}>
          <i className="bi bi-arrow-left-circle"></i>
        </button>{" "}
        {month.format("MMMM YYYY")}{" "}
        <button onClick={() => changeMonthValue(1)}>
          <i className="bi bi-arrow-right-circle"></i>
        </button>
      </h2>
      <CardGroup>
        {emptyInitialCards.join("")}
        {dates.map((date, i) => (
          <DayOfMonth
            date={date}
            key={i}
            data={data.phase[dates[i].date()].phaseName}
            svg={data.phase[dates[i].date()].svg}
          />
        ))}
      </CardGroup>
    </section>
  );
};

const DayOfMonth = ({ date, data, svg }) => {
  return (
    <Card>
      <div className="svg" dangerouslySetInnerHTML={{ __html: svg }}></div>
      <Card.Body>
        <Card.Title>{date.format("ddd MMM D")}</Card.Title>
        <Card.Text>
          {data} <br />
          {moonPhases[data].action}
          <br />
          {moonPhases[data].desc}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
