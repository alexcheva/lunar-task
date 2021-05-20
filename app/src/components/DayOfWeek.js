import * as React from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Link } from "react-router-dom";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";

const DayOfWeek = ({ date, svg, data, tasks }) => {
  const [dayTasks, setDayTasks] = React.useState([]);

  const loadDayTasks = async () =>
    setDayTasks(await apiClient.getTasks(date.format("YYYY-MM-DD")));

  React.useEffect(() => {
    setDayTasks(tasks);
  }, [tasks]);
  return (
    <Card>
      <div
        className="card-img-top mx-auto d-block"
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
      <Card.Body>
        <Card.Title>
          <Link to={`/day/${date.format("YYYY-MM-DD")}`}>
            {date.format("ddd MMM D YYYY")}
          </Link>
        </Card.Title>
        <Card.Text>
          {data}
          <br />
          {moonPhases[data]?.action}
          <br />
          {moonPhases[data]?.desc}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <AddTask loadDayTasks={loadDayTasks} date={date} />
        </ListGroupItem>
      </ListGroup>
      <TaskList tasks={dayTasks} />
    </Card>
  );
};

const TaskList = ({ tasks }) => (
  <ListGroup className="list-group-flush">
    {tasks.map(({ id, task }) => (
      <ListGroupItem key={id}>
        {task}
        <button>
          <i className="bi bi-pencil-square"></i>
        </button>
        <button variant="danger">
          <i className="bi bi-trash-fill"></i>
        </button>
      </ListGroupItem>
    ))}
  </ListGroup>
);

const AddTask = ({ loadDayTasks, date }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      await apiClient.addTask(task, date);
      loadDayTasks();
      setTask("");
    }
  };

  return (
    <form bg="dark" text="light" onSubmit={onSubmit}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default DayOfWeek;
