import * as React from "react";

import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import DatePicker from "react-datepicker";
import { Link, useParams, useHistory } from "react-router-dom";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";
//rename data to props
const Day = ({ initialData, userId }) => {
  let { day } = useParams();
  let history = useHistory();
  console.log({ userId });

  const [date, setDate] = React.useState(dayjs(day));
  const [tasks, setTasks] = React.useState([]);
  const [data, setData] = React.useState(initialData);

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
    setDate(newDate);
  };

  React.useEffect(() => {
    if (data[0]?.month !== date.month()) {
      loadMoonData(date.month());
    }
    loadTasks();
  }, [date]);
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  if (!data) {
    return "Loading";
  }

  const dayData = data?.[date.date() - 1] || {};
  const svg = dayData.svg;

  return (
    <section>
      <Card className="text-center" bg="dark" text="light">
        <Card.Header>
          Choose the Date:{" "}
          <DatePicker
            selected={date.toDate()}
            onChange={(date) => {
              setDate(dayjs(date));
              history.push(`/day/${dayjs(date).format("YYYY-MM-DD")}`);
            }}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Link to={`/day/${date.add(-1, "day").format("YYYY-MM-DD")}`}>
              <Button
                variant="outline-info"
                onClick={() => changeDateValue(-1)}
              >
                <i className="bi bi-arrow-left-circle"></i>
              </Button>
            </Link>{" "}
            {date.format("ddd MMM D YYYY")}{" "}
            <Link to={`/day/${date.add(1, "day").format("YYYY-MM-DD")}`}>
              <Button variant="outline-info" onClick={() => changeDateValue(1)}>
                <i className="bi bi-arrow-right-circle"></i>
              </Button>
            </Link>
          </Card.Title>
          <div
            className="card-img-top mx-auto d-block"
            dangerouslySetInnerHTML={{
              __html: svg,
            }}
          ></div>
          <Card.Text>
            Moon Phase: {dayData.AlexPhase}
            <br />
            Action: {moonPhases[dayData.AlexPhase]?.action}
            <br />
            Details: {moonPhases[dayData.AlexPhase]?.desc}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem variant="dark">
            <AddTask loadTasks={loadTasks} userId={userId} date={date} />
          </ListGroupItem>
        </ListGroup>
        <TaskList loadTasks={loadTasks} userId={userId} tasks={tasks} />
      </Card>
    </section>
  );
};

const TaskList = ({ loadTasks, tasks, userId }) => {
  const deleteTask = async (id) => {
    await apiClient.deleteTask(id);
    loadTasks(userId);
  };
  return (
    <ListGroup className="list-group-flush">
      {tasks.map(({ id, task }) => (
        <ListGroupItem variant="dark" key={id}>
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

const AddTask = ({ loadTasks, date, userId }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      await apiClient.addTask(task, date, userId);
      loadTasks();
      setTask("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>{" "}
      <Button variant="info" disabled={!canAdd}>
        Add
      </Button>
    </form>
  );
};

export default Day;
