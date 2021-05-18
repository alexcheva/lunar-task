import * as React from "react";

import dayjs from "dayjs";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import { moonPhases } from "../MoonPhases";
import * as apiClient from "../apiClient";

const Day = (data) => {
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
  const currentSvg = `<svg width="150" height="150" viewBox="0 0 100 100"><g><circle cx="50" cy="50" r="49" stroke="none"  fill="black"/><path d="M 50 1 A 49,49 0 0,1 49,99 A -44.1,49 0 0,1 50,1" stroke-width="0" stroke="none" fill="rgb(255,255,210)" /><a xlink:href="https://www.icalendar37.net/lunar/app/" rel="noopener noreferrer" target="_blank"><circle cx="50" cy="50" r="49" style="pointer-events:all;cursor:pointer" stroke-width="0"   fill="transparent" /></a></g></svg>`;
  const regex = /\\/g;
  const svg = data.data.phase[date.date()].svg;
  //svg.replace(regex, "");
  //svg.replace("xlink:href", "href");
  const link =
    '<a xlink:href="https://www.icalendar37.net/lunar/app/" rel="noopener noreferrer" target="_blank">';
  svg.replace(link, "");
  svg.replace('style="pointer-events:all;cursor:pointer" ', "");
  // console.log(svg);
  return (
    <Card>
      <div
        className="card-img-top mx-auto d-block"
        dangerouslySetInnerHTML={{
          __html: svg
            .replace(link, "")
            .replace('style="pointer-events:all;cursor:pointer" ', "")
            .replace(
              "<g>",
              `<defs>
            <pattern
              id="image11"
              x="0"
              y="0"
              patternUnits="userSpaceOnUse"
              height="100"
              width="100"
            >
              <image
                x="0"
                y="0"
                height="100"
                width="100"
                href="https://www.icalendar37.net/lunar/api/i.png"
              ></image>
            </pattern>
          </defs>
          <g>`,
            )
            .replace(' fill="transparent" ', 'fill="url(#image11)"')
            .replace("rgb(255,255,210)", "white"),
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
          {data.data.phase[date.date()].phaseName}
          {/*data.data.phase[date.date()].npWidget*/}
          <br />
          {moonPhases[data.data.phase[date.date()].phaseName].action}
          <br />
          {moonPhases[data.data.phase[date.date()].phaseName].desc}
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
