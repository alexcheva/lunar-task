import * as React from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const Day = () => {
  const today = new Date();
  const [date, setDate] = React.useState(today);
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
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://www.icalendar37.net/lunar/api/i.png"
      />

      <Card.Body>
        <Card.Title>
          <i class="bi bi-arrow-left-circle"></i> {formatDate()}{" "}
          <i class="bi bi-arrow-right-circle"></i>
        </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <form>
            <label>
              New task: <input />
            </label>
            <button>Add</button>
          </form>
        </ListGroupItem>
        <ListGroupItem>
          Cras justo odio <i class="bi bi-pencil-square"></i>{" "}
          <i class="bi bi-trash-fill"></i>
        </ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default Day;
