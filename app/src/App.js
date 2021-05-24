import * as React from "react";

import "react-datepicker/dist/react-datepicker.css";

import { useAuth0 } from "@auth0/auth0-react";
import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Container>
        <Row className="Aligner">
          <Col md="Aligner-item">
            <Spinner animation="grow" className="purple" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
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
        <Container fluid>
          <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
            <Navbar.Brand href="/">
              <img
                alt="Lunar Task Logo"
                src={logo}
                className="d-inline-block align-top logo"
              />{" "}
              Lunar Task
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav fill className="justify-content-end" activeKey="/home">
                <Nav.Item>
                  <Nav.Link href={`/day/${dayjs().format("YYYY-MM-DD")}`}>
                    Day View
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1" href="/week">
                    Week View
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
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Container>
          <Switch>
            <Route path="/week">
              <Week initialData={moonPhaseData} userId={userId} />
            </Route>
            <Route path="/day/:day">
              <Day initialData={moonPhaseData} userId={userId} />
            </Route>
            <Route path="/">
              <Day initialData={moonPhaseData} userId={userId} />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  } else {
    return (
      <Jumbotron className="bg-dark" fluid>
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
