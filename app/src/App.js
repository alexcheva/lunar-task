import * as React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import dayjs from "dayjs";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import * as apiClient from "./apiClient";
import Calendar from "./components/Calendar";
import Day from "./components/Day";
import Week from "./components/Week";
import logo from "./moon-logo.svg";
import moonImg from "./moon.png";

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
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    const username = user.email ? user.email : user.username;
    //check the database to see if the email is in the database
    const checkUser = async () => {
      const currentUser = await apiClient.checkUser(user.email);
      console.log(currentUser);
    };
    checkUser();
    console.log(user.email);
    //if not insert it
    //if so use user.id

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
                    <Link to="/">Day View</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1">
                    <Link to="/week">Week View</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">
                    <Link to="/calendar">Calendar View</Link>
                  </Nav.Link>
                </Nav.Item>

                <NavDropdown title={username} id="nav-dropdown">
                  <NavDropdown.Item eventKey="3.1">Profile</NavDropdown.Item>
                  <NavDropdown.Item eventKey="3.2">Journal</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    eventKey="3.3"
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
                  <Week initialData={moonPhaseData} />
                </section>
              </Route>
              <Route path="/calendar">
                <Calendar data={moonPhaseData} />
              </Route>
              <Route path="/">
                <section>
                  <Day initialData={moonPhaseData} />
                </section>
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    );
  } else {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }
};

export default App;
