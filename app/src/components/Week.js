import * as React from "react";

import dayjs from "dayjs";
import CardGroup from "react-bootstrap/CardGroup";

import DayOfWeek from "./DayOfWeek";

const Week = () => {
  const [startOfWeek, setStartOfWeek] = React.useState(
    dayjs().startOf("week").add(1, "day"),
  );

  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(startOfWeek.add(i, "day"));
  }
  //.format("ddd MMM D YYYY");

  const changeWeek = (value) => {
    setStartOfWeek(startOfWeek.add(value, "week"));
  };
  return (
    <>
      <h2>
        <button onClick={() => changeWeek(-1)}>
          <i className="bi bi-arrow-left-circle"></i>
        </button>{" "}
        Week View
        <button onClick={() => changeWeek(1)}>
          <i className="bi bi-arrow-right-circle"></i>
        </button>
      </h2>
      <CardGroup>
        {dates.map((date, i) => (
          <DayOfWeek date={date} key={i} />
        ))}
      </CardGroup>
    </>
  );
};

export default Week;
