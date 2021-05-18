import * as React from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";

const DayOfWeek = ({ date, svg, data, tasks }) => {
  return (
    <Card>
      <div
        className="card-img-top mx-auto d-block"
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
      <Card.Body>
        <Card.Title>{date.format("ddd MMM D YYYY")}</Card.Title>
        <Card.Text>
          {data}
          <br />
          {moonPhases[data].action}
          <br />
          {moonPhases[data].desc}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <AddTask />
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

const AddTask = ({ loadTasks }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      await apiClient.addTask(task);
      loadTasks();
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
