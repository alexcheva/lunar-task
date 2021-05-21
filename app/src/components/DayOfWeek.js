import * as React from "react";

import Button from "react-bootstrap/Button";
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
    <Card
      className="text-center"
      style={{ width: "18rem" }}
      bg="dark"
      text="light"
    >
      <Card.Body>
        <Card.Title>
          <Link to={`/day/${date.format("YYYY-MM-DD")}`}>
            {date.format("ddd MMM D YYYY")}
          </Link>
        </Card.Title>
        <div
          className="card-img-top mx-auto d-block"
          dangerouslySetInnerHTML={{ __html: svg }}
        ></div>
        <Card.Text>
          Moon Phase: {data}
          <br />
          Action: {moonPhases[data]?.action}
          <br />
          Details: {moonPhases[data]?.desc}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem variant="dark">
          <AddTask loadDayTasks={loadDayTasks} date={date} />
        </ListGroupItem>
      </ListGroup>
      <TaskList loadDayTasks={loadDayTasks} tasks={dayTasks} />
    </Card>
  );
};

const TaskList = ({ loadTasks, tasks }) => {
  const deleteTask = async (id) => {
    await apiClient.deleteTask(id);
    loadTasks();
  };
  return (
    <ListGroup className="list-group-flush">
      {tasks.map(({ id, task }) => (
        <ListGroupItem key={id}>
          {task}{" "}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteTask(id)}
            value={task}
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

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
      <Button variant="info" disabled={!canAdd}>
        Add
      </Button>
    </form>
  );
};

export default DayOfWeek;
