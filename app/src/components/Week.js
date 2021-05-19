import * as React from "react";

import dayjs from "dayjs";
import CardGroup from "react-bootstrap/CardGroup";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";

import DayOfWeek from "./DayOfWeek";

const Week = ({ initialData }) => {
  const [startOfWeek, setStartOfWeek] = React.useState(
    dayjs().startOf("week").add(1, "day"),
  );
  const [dayTasks, setDayTasks] = React.useState([]);
  const [data, setData] = React.useState(initialData);

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

  console.log(dayTasks);
  //filter dates from
  const loadMoonData = async (month) => {
    const formattedData = await apiClient.getMoonData(
      month,
      dayjs().get("year"),
    );
    setData(formattedData);
  };

  const changeWeek = (value) => {
    let newStart = startOfWeek.add(value, "week");
    if (newStart.month() !== startOfWeek.month()) {
      loadMoonData(newStart.month());
    }
    setStartOfWeek(newStart);
  };

  React.useEffect(() => {
    loadTasks();
  }, [startOfWeek]);
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

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
              svg={data?.[dates[i].date() - 1]?.svg}
              data={data?.[dates[i].date() - 1]?.AlexPhase}
            />
          );
        })}
      </CardGroup>
    </>
  );
};

export default Week;
