import * as React from "react";

import dayjs from "dayjs";
import CardGroup from "react-bootstrap/CardGroup";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";

import DayOfWeek from "./DayOfWeek";

const Week = ({ data }) => {
  const [startOfWeek, setStartOfWeek] = React.useState(
    dayjs().startOf("week").add(1, "day"),
  );
  const [dayTasks, setDayTasks] = React.useState([]);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(startOfWeek.add(i, "day"));
  }
  const loadTasks = async () =>
    setDayTasks(
      await apiClient.getTasks(
        dates[0].format("YYYY-MM-DD"),
        dates[6].format("YYYY-MM-DD"),
      ),
    );
  React.useEffect(() => {
    loadTasks();
  }, [startOfWeek]);
  console.log(dayTasks);
  //filter dates from
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
        {dates.map((date, i) => {
          const tasksOfTheDay = dayTasks.filter(
            (task) =>
              dayjs(task.date).format("YYYY-MM-DD") ===
              date.format("YYYY-MM-DD"),
          );
          return (
            <DayOfWeek
              date={date}
              tasks={tasksOfTheDay}
              key={i}
              svg={data[dates[i].date()].svg}
              data={data[dates[i].date()].phaseName}
            />
          );
        })}
      </CardGroup>
    </>
  );
};

export default Week;
