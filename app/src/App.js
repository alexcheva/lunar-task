import * as React from "react";

import "react-datepicker/dist/react-datepicker.css";

import { useAuth0 } from "@auth0/auth0-react";
import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import * as apiClient from "./apiClient";
import Day from "./components/Day";
import Week from "./components/Week";
import logo from "./moon-logo.svg";

const App = () => {
  const [moonPhaseData, setMoonPhaseData] = React.useState({});

  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const loadMoonData = async () => {
    const formattedData = await apiClient.getMoonData(
      dayjs().get("month"),
      dayjs().get("year"),
    );
    setMoonPhaseData(formattedData);
  };
  React.useEffect(() => {
    loadMoonData();
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (isAuthenticated) {
    const username = user.email ? user.email : user.username;

    const checkUser = async () => {
      const currentUser = await apiClient.checkUser(user.email);
      return currentUser;
    };
    const userId = checkUser();

    return (
      <Router>
        <main>
          <Container fluid>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand>
                <img
                  alt="Lunar Task Logo"
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                Lunar Task
              </Navbar.Brand>
              <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                  <Nav.Link active>
                    <Link to={`/day/${dayjs().format("YYYY-MM-DD")}`}>
                      Day View
                    </Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1">
                    <Link to="/week">Week View</Link>
                  </Nav.Link>
                </Nav.Item>
                <NavDropdown title={username} id="nav-dropdown">
                  <NavDropdown.Item
                    eventKey="2.1"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar>
          </Container>
          <Container>
            <Switch>
              <Route path="/week">
                <section>
                  <Week initialData={moonPhaseData} userId={userId} />
                </section>
              </Route>
              <Route path="/day/:day">
                <section>
                  <Day initialData={moonPhaseData} userId={userId} />
                </section>
              </Route>
              <Route path="/">
                <section>
                  <Day initialData={moonPhaseData} userId={userId} />
                </section>
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    );
  } else {
    return (
      <Jumbotron fluid>
        <h1>
          <img alt="Lunar Task Logo" className="intro-logo" src={logo} /> Lunar
          Task
        </h1>
        <p>
          <strong> Lunar task</strong> is a task management app that integrates
          with Moon Phase API to provide spiritual context for the day and keep
          your intentions in line with the universe.
          <span role="img" aria-label="sparkling stars emoji">
            ✨
          </span>
        </p>
        <p>
          <Button onClick={() => loginWithRedirect()} variant="info">
            Log in
          </Button>
        </p>
      </Jumbotron>
    );
  }
};

export default App;
