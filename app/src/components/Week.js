import * as React from "react";

import dayjs from "dayjs";
import CardGroup from "react-bootstrap/CardGroup";

import { moonPhases } from "../MoonPhases";

import DayOfWeek from "./DayOfWeek";

const Week = (data) => {
  const [startOfWeek, setStartOfWeek] = React.useState(
    dayjs().startOf("week").add(1, "day"),
  );

  const dates = [];
  const svgs = [];
  for (let i = 0; i < 7; i++) {
    dates.push(startOfWeek.add(i, "day"));
    svgs.push(data.data.phase[dates[i].date()].svg);
  }
  console.log(svgs);
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
          <DayOfWeek
            date={date}
            key={i}
            svg={svgs[i]}
            data={data.data.phase[dates[i].date()].phaseName}
          />
        ))}
      </CardGroup>
    </>
  );
};

export default Week;
