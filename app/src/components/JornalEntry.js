import * as React from "react";

import dayjs from "dayjs";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import * as apiClient from "../apiClient";

const JournalEntry = () => {
  const today = dayjs();
  const [date, setDate] = React.useState(today);
  const [tasks, setTasks] = React.useState([]);
  const [journalEntry, setJournalEntry] = React.useState([]);

  const loadTasks = async () => setJournalEntry(await apiClient.getTasks());

  React.useEffect(() => {
    loadTasks();
  }, []);

  const changeDateValue = (addValue) => {
    {
      /* setDate(date.setDate(date.getDate() + addValue)); */
    }
    setDate(date.add(addValue, "day"));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h2>Journal Entry</h2>
          <button onClick={() => changeDateValue(-1)}>
            <i className="bi bi-arrow-left-circle"></i>
          </button>{" "}
          {date.format("ddd MMM D YYYY")}{" "}
          <button onClick={() => changeDateValue(1)}>
            <i className="bi bi-arrow-right-circle"></i>
          </button>
        </Card.Title>
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
        New Journal Entry:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default JournalEntry;