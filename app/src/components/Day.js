import * as React from "react";

import dayjs from "dayjs";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";
//rename data to props
const Day = ({ data }) => {
  const today = dayjs();
  const [date, setDate] = React.useState(today);
  const [tasks, setTasks] = React.useState([]);

  const loadTasks = async () =>
    setTasks(await apiClient.getTasks(date.format("YYYY-MM-DD")));

  React.useEffect(() => {
    loadTasks();
  }, [date]);

  const changeDateValue = (addValue) => {
    setDate(date.add(addValue, "day"));
  };
  console.log(date.date());
  const regex = /\\/g;
  const svg = data[date.date()].svg;

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
          {data[date.date()].phaseName}
          {/*data.data.phase[date.date()].npWidget*/}
          <br />
          {moonPhases[data[date.date()].phaseName].action}
          <br />
          {moonPhases[data[date.date()].phaseName].desc}
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
