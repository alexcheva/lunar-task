import * as React from "react";

import * as apiClient from "./apiClient";
import Day from "./components/Day";
import logo from "./moon-logo.svg";

const App = () => {
  const [tasks, setTasks] = React.useState([]);

  const today = new Date();
  const [date, setDate] = React.useState(today);
  const loadTasks = async () => setTasks(await apiClient.getTasks());

  React.useEffect(() => {
    loadTasks();
  }, []);

  const formatDate = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = daysOfWeek[date.getDay()];
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = date.getFullYear();

    let dateValue = day + " " + mm + "/" + dd + "/" + yyyy;
    return dateValue;
  };

  const changeDateValue = ({ addValue }) => {
    setDate(date.setDate(date.getDate() + addValue));
  };

  return (
    <main className="App">
      <nav>
        <img id="header-logo" src={logo} alt="Lunar Task Logo" />
        <h1>Lunar Task</h1>
      </nav>
      <section>
        <h2>{formatDate()}</h2>
        <AddTask loadTasks={loadTasks} />
        <TaskList tasks={tasks} />
      </section>
      <section>
        <Day />
      </section>
    </main>
  );
};

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map(({ id, name }) => (
      <li key={id}>
        {name}
        <button>Edit</button>
        <button>Delete</button>
      </li>
    ))}
  </ul>
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

export default App;
