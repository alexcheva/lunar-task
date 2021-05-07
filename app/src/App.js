import * as React from "react";

// import * as apiClient from "./apiClient";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Calendar from "./components/Calendar";
import Day from "./components/Day";
import Week from "./components/Week";
import logo from "./moon-logo.svg";

const App = () => {
  return (
    <Router>
      <main className="App">
        <nav>
          <img id="header-logo" src={logo} alt="Lunar Task Logo" />
          <h1>Lunar Task</h1>
          <ul>
            <li key={1}>
              <Link to="/">Day View</Link>
            </li>
            <li key={2}>
              <Link to="/week">Week View</Link>
            </li>
            <li key={3}>
              <Link to="/calendar">Calendar View</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/week">
            <section>
              <Week />
            </section>
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/">
            <section>
              <Day />
            </section>
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
