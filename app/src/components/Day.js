import * as React from "react";

import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import DatePicker from "react-datepicker";
import { Link, useParams, useHistory } from "react-router-dom";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";

const Day = ({ initialData, userId }) => {
  let { day } = useParams();
  debugger;
  let history = useHistory();

  const [date, setDate] = React.useState(dayjs(day));
  const [tasks, setTasks] = React.useState([]);
  const [data, setData] = React.useState(initialData);

  const loadTasks = async () => {
    setTasks(
      await userId
        .then((data) => data.id)
        .then((id) => apiClient.getTasks(id, date.format("YYYY-MM-DD"))),
    );
  };

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
  }, [date, data]);
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  if (!data) {
    return "Loading";
  }

  const dayData = data?.[date.date() - 1] || {};
  const svg = dayData.svg;

  return (
    <Card className="text-center" bg="dark" text="light">
      <Card.Header>
        Choose the Date:{" "}
        <div className="customDatePickerWidth">
          <DatePicker
            selected={date.toDate()}
            onChange={(date) => {
              setDate(dayjs(date));
              history.push(`/day/${dayjs(date).format("YYYY-MM-DD")}`);
            }}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Link to={`/day/${date.add(-1, "day").format("YYYY-MM-DD")}`}>
            <Button
              variant="outline-info"
              className="left"
              onClick={() => changeDateValue(-1)}
            >
              <i className="bi bi-arrow-left-circle"></i>
            </Button>
          </Link>{" "}
          {date.format("ddd MMM D YY")}{" "}
          <Link to={`/day/${date.add(1, "day").format("YYYY-MM-DD")}`}>
            <Button
              variant="outline-info"
              className="right"
              onClick={() => changeDateValue(1)}
            >
              <i className="bi bi-arrow-right-circle"></i>
            </Button>
          </Link>
        </Card.Title>
        <div
          id="day-view-moon"
          className="card-img-top mx-auto d-block"
          dangerouslySetInnerHTML={{
            __html: svg,
          }}
        ></div>
        <Card.Text>
          <em> Moon Phase: </em>
          <strong>{dayData.AlexPhase}</strong>
          <br />
          <em> Action: </em>
          <strong>{moonPhases[dayData.AlexPhase]?.action}</strong>
          <br />
          <em> Details:</em>{" "}
          <strong>{moonPhases[dayData.AlexPhase]?.desc}</strong>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem variant="dark">
          <AddTask loadTasks={loadTasks} userId={userId} date={date} />
        </ListGroupItem>
      </ListGroup>
      <TaskList loadTasks={loadTasks} userId={userId} tasks={tasks} />
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
      await userId
        .then((data) => data.id)
        .then((id) => apiClient.addTask(task, date, id));
      loadTasks();
      setTask("");
    }
  };

  return (
    <Form className="align-items-center" onSubmit={onSubmit}>
      <Form.Row className="align-items-center">
        <Col>
          <Form.Label>
            New task:{" "}
            <Form.Control
              onChange={(e) => setTask(e.currentTarget.value)}
              value={task}
            />
          </Form.Label>{" "}
          <Button
            type="submit"
            className="my-1"
            variant="info"
            disabled={!canAdd}
          >
            Add
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default Day;
