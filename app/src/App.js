import * as React from "react";

// import * as apiClient from "./apiClient";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Calendar from "./components/Calendar";
import Day from "./components/Day";
import Week from "./components/Week";
import logo from "./moon-logo.svg";

const App = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <Router>
      <main className="App">
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
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
  ) : (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  );
};

export default App;
