import * as React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import dayjs from "dayjs";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import * as apiClient from "./apiClient";
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
      console.log(currentUser);
    };
    checkUser();

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
                    <Link to="/day/:date">Day View</Link>
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
                  <Week initialData={moonPhaseData} />
                </section>
              </Route>
              <Route path="/day/:date">
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
