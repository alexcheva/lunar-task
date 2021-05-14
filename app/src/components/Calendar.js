import * as React from "react";

// import dayGridPlugin from "@fullcalendar/daygrid";
// import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";

const Calendar = (data) => {
  const [month, setMonth] = React.useState(dayjs());
  const [daysInMonth, setDaysInMonth] = React.useState(month.daysInMonth());
  // const [moonData, setMoonData] = React.useState({});

  // const loadMoonData = async () => setMoonData(await apiClient.getMoonData());

  // React.useEffect(() => {
  //   setMoonData(data);
  //   loadMoonData().then((data) => setMoonData(data));
  // }, []);

  const dates = [];
  const svgs = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(month.date(i));
    svgs.push(data.data.phase[dates[i - 1].date()].svg);
  }
  console.log(data.data.phase[1]);

  //link to days
  //pass in the date props
  //make different routes to the specific days
  //switch between months
  const changeMonthValue = (addValue) => {
    setMonth(month.add(addValue, "month"));
    setDaysInMonth(month.daysInMonth());
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
          <DayOfMonth
            date={date}
            key={i}
            data={data.data.phase[dates[i].date()].phaseName}
            svg={data.data.phase[dates[i].date()].svg}
          />
        ))}
      </CardGroup>
    </section>
  );
};
{
  /* <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" /> */
}
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
