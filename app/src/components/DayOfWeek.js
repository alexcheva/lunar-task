import * as React from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import * as apiClient from "../apiClient";

const DayOfWeek = ({ date }) => {
  const [tasks, setTasks] = React.useState([]);

  const loadTasks = async () => setTasks(await apiClient.getTasks());

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://www.icalendar37.net/lunar/api/i.png"
      />
      <Card.Body>
        <Card.Title>{date.format("ddd MMM D YYYY")}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <AddTask loadTasks={loadTasks} />
        </ListGroupItem>
      </ListGroup>
      <TaskList tasks={tasks} />
    </Card>
  );
};

const TaskList = ({ tasks }) => (
  <ListGroup className="list-group-flush">
    {tasks.map(({ id, name }) => (
      <ListGroupItem key={id}>
        {name}
        <button>
          <i className="bi bi-pencil-square"></i>
        </button>
        <button>
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
    <form onSubmit={onSubmit}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default DayOfWeek;
