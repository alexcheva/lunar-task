import * as React from "react";

import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import * as apiClient from "../apiClient";
import img01 from "../imgs/04.jpeg";

import DayOfWeek from "./DayOfWeek";

const Week = ({ initialData, userId }) => {
  const [startOfWeek, setStartOfWeek] = React.useState(
    dayjs().startOf("week").add(1, "day"),
  );
  const [dayTasks, setDayTasks] = React.useState([]);
  const [data, setData] = React.useState(initialData);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(startOfWeek.add(i, "day"));
  }
  const loadTasks = async () => {
    setDayTasks(
      await userId
        .then((data) => data.id)
        .then((id) =>
          apiClient.getTasks(
            id,
            dates[0].format("YYYY-MM-DD"),
            dates[6].format("YYYY-MM-DD"),
          ),
        ),
    );
  };

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
      <Row>
        <Col className="text-center">
          <h2>
            <Button
              variant="info"
              className="left"
              onClick={() => changeWeek(-1)}
            >
              <i className="bi bi-arrow-left-circle"></i>
            </Button>{" "}
            Week View{" "}
            <Button
              variant="info"
              className="right"
              onClick={() => changeWeek(1)}
            >
              <i className="bi bi-arrow-right-circle"></i>
            </Button>
          </h2>
        </Col>
      </Row>
      <CardDeck>
        {dates.map((date, i) => {
          const tasksOfTheDay = dayTasks.filter(
            (task) =>
              dayjs(task.date).format("YYYY-MM-DD") ===
              date.format("YYYY-MM-DD"),
          );
          return (
            <DayOfWeek
              userId={userId}
              date={date}
              tasks={tasksOfTheDay}
              key={i}
              svg={data?.[dates[i].date() - 1]?.svg}
              data={data?.[dates[i].date() - 1]?.AlexPhase}
            />
          );
        })}
        <Quote />
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
    <Card className="text-center" bg="dark" text="light">
      <Card.Body>
        <Card.Title>Quote Of the Week:</Card.Title>

        <Card.Img variant="top" id="quoteImg" src={img01} />
        <Card.Text>
          Quote:
          <em> {quote.q}</em>
          <br />
          Author:
          <em> {quote.a}</em>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Week;
