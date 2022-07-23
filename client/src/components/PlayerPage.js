import React, { useState, useEffect } from "react";
import getCurrentUser from "../services/getCurrentUser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const PlayerPage = (props) => {
  console.log("hey from player page");

  // const [currentUser, setCurrentUser] = useState(undefined);
  // const fetchCurrentUser = async () => {
  //   try {
  //     const user = await getCurrentUser();
  //     setCurrentUser(user);
  //   } catch (err) {
  //     setCurrentUser(null);
  //   }
  // };
  const [player, setPlayer] = useState({
    profileImg: {},
    playerName: "",
    team: "",
  });
  const [userPayload, setUserPayLoad] = useState({
    team: "",
    email: "",
  });

  const playerId = props.match.params.id;
  const fetchPlayer = async () => {
    console.log("In fetch player");
    try {
      const response = await fetch(`/api/v1/users/${playerId}`);
      const body = await response.json();
      console.log("body: ", body);
      setPlayer(body.player);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  let playerName = "Player";
  // if (currentUser) {
  //   playerName = currentUser.playerName;
  // }

  const onInputChange = (event) => {
    setUserPayLoad({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    console.log("Name: ", event.currentTarget.name);
    console.log("Value: ", event.currentTarget.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Handle Submit called");
    editInfo();
  };

  const editInfo = async () => {
    try {
      const response = await fetch(`/api/v1/users/${playerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });
      if (!response.ok) {
        console.log("Error in editInfo");
      } else {
        console.log("successful patch!");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container className="top-marg">
      <Row>
        <Col sm={12} md={6} lg={6}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="center-text">{player.playerName}</Card.Title>
            </Card.Body>
            <Card.Img variant="top" src={player.profileImg} />
            <Card.Body>
              <Card.Title>Team - {player.team}</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={6}>
          <Form onSubmit={handleSubmit}>
            <h1 className="center-text">Edit Details</h1>
            <Form.Group className="mb-3" controlId="formBasicTeam">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                value={userPayload.team}
                name="team"
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={userPayload.email}
                name="email"
                onChange={onInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Edit Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default PlayerPage;
