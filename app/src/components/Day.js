import * as React from "react";

import dayjs from "dayjs";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";
//rename data to props
const Day = ({ initialData }) => {
  const today = dayjs();
  const [date, setDate] = React.useState(today);
  const [tasks, setTasks] = React.useState([]);
  const [data, setData] = React.useState(initialData);
  console.log(data);

  const loadTasks = async () =>
    setTasks(await apiClient.getTasks(date.format("YYYY-MM-DD")));

  const loadMoonData = async (month) => {
    const formattedData = await apiClient.getMoonData(
      month,
      dayjs().get("year"),
    );
    setData(formattedData);
  };

  const changeDateValue = (addValue) => {
    let newDate = date.add(addValue, "day");
    console.log({ newDate }, newDate.month);
    if (newDate.month() !== date.month()) {
      debugger;
      console.log("I'm here!!!");
      loadMoonData(newDate.month()).then(() => setDate(newDate));
      //  setDate(newDate);
    } else {
      setDate(newDate);
    }
  };

  console.log("Date", date.date() - 1);
  console.log(date);
  console.log(data);
  React.useEffect(() => {
    loadTasks();
  }, [date]);
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  if (!data) {
    return "Loading";
  }
  // const svg = data[date.date() - 1].svg;
  const dayData = data?.[date.date() - 1] || {};
  const svg = dayData.svg;

  // console.log(data[date.day() - 1]);
  // console.log(data[date.day() - 1].AlexPhase);
  // console.log(moonPhases[data[date.day() - 1].AlexPhase]);

  return (
    <Card>
      <div
        className="card-img-top mx-auto d-block"
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
      ></div>
      {/* bg="dark" text="light" */}
      <Card.Body>
        <Card.Title>
          <button onClick={() => changeDateValue(-1)}>
            <i className="bi bi-arrow-left-circle"></i>
          </button>{" "}
          {date.format("ddd MMM D YYYY")}{" "}
          <button onClick={() => changeDateValue(1)}>
            <i className="bi bi-arrow-right-circle"></i>
          </button>
        </Card.Title>
        <Card.Text>
          {dayData.AlexPhase}
          {/*data.data.phase[date.date()].npWidget*/}
          <br />
          {moonPhases[dayData.AlexPhase]?.action}
          <br />
          {moonPhases[dayData.AlexPhase]?.desc}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <AddTask loadTasks={loadTasks} date={date} />
        </ListGroupItem>
      </ListGroup>
      <TaskList tasks={tasks} />
    </Card>
  );
};

const TaskList = ({ tasks }) => (
  <ListGroup className="list-group-flush">
    {tasks.map(({ id, task }) => (
      <ListGroupItem key={id}>
        {task}
        <button variant="warning">
          <i className="bi bi-pencil-square"></i>
        </button>
        <button variant="danger">
          <i className="bi bi-trash-fill"></i>
        </button>
      </ListGroupItem>
    ))}
  </ListGroup>
);

const AddTask = ({ loadTasks, date }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      await apiClient.addTask(task, date);
      loadTasks();
      setTask("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Day;
