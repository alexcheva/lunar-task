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

const month = dayjs().month();
const year = dayjs().get("year");
const moonPhaseUrl = `https://www.icalendar37.net/lunar/api/?lang=en&month=${
  month + 1
}&year=${year}&size=150&lightColor=rgb(255%2C255%2C210)&shadeColor=black&texturize=false&LDZ=1619852400`;

// export const getMoonPhases = async (url) => {
//   const response = await fetch(url);
//   const data = response.json();
//   console.log(data);
//   return data;
// };

const App = () => {
  const [moonPhaseData, setMoonPhaseData] = React.useState({});
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const loadMoonData = async () =>
    setMoonPhaseData(await apiClient.getMoonData(moonPhaseUrl));

  React.useEffect(() => {
    loadMoonData();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  const username = user.email ? user.email : user.username;

  return isAuthenticated ? (
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
                <Week data={moonPhaseData} />
              </section>
            </Route>
            <Route path="/calendar">
              <Calendar data={moonPhaseData} />
            </Route>
            <Route path="/">
              <section>
                <Day data={moonPhaseData} />
              </section>
            </Route>
          </Switch>
        </Container>
      </main>
    </Router>
  ) : (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  );
};

export default App;
