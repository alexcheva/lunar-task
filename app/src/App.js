import * as React from "react";

// import * as apiClient from "./apiClient";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
          <Route path="/">
            <section>
              <Day />
            </section>
          </Route>
          <Route path="/week">
            <section>
              <Week />
            </section>
          </Route>
          <Route path="/calendar">
            <h1>Calendar view</h1>
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
