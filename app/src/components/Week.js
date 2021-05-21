import * as React from "react";

import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

import * as apiClient from "../apiClient";
import img01 from "../imgs/04.jpeg";

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
        <Button variant="info" onClick={() => changeWeek(-1)}>
          <i className="bi bi-arrow-left-circle"></i>
        </Button>{" "}
        Week View{" "}
        <Button variant="info" onClick={() => changeWeek(1)}>
          <i className="bi bi-arrow-right-circle"></i>
        </Button>
      </h2>
      <CardDeck>
        <Quote />
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
      </CardDeck>
    </>
  );
};
const Quote = () => {
  // const [quote, setQuote] = React.useState({});

  // const loadQuote = async () =>
  //   setQuote(await apiClient.getQuote(date.format("YYYY-MM-DD")));

  // React.useEffect(() => {
  //   setQuote(quoteData);
  // }, [quoteData]);
  const quote = {
    q: "The merit of all things lies in their difficulty.",
    a: "Alexandre Dumas",
    h:
      "<blockquote>&ldquo;The merit of all things lies in their difficulty.&rdquo; &mdash; <footer>Alexandre Dumas</footer></blockquote>",
  };
  return (
    <Card
      className="text-center"
      style={{ width: "18rem" }}
      bg="dark"
      text="light"
    >
      <Card.Body>
        <Card.Title>Inspirational Quote for the Week:</Card.Title>

        <Card.Img variant="top" id="quoteImg" src={img01} />
        <Card.Text>
          Quote: {quote.q}
          <br />
          Author: {quote.a}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Week;
