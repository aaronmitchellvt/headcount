import React, { useState, useEffect } from "react";
import SignOutButton from "../components/authentication/SignOutButton";
import { Redirect } from "react-router";


const PlayerPage = (props) => {
  console.log("hey from player page");

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [player, setPlayer] = useState({
    profileImg: {},
    firstName: "",
    lastName: "",
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

  if (shouldRedirect) {
    location.href = "/events";
  }

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
        //redirect
        setShouldRedirect(true)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="mt-8 justify-center mx-auto">
    <h2 className="text-center">{player.firstName} {player.lastName}</h2>

    {/* <div className="object-center"> */}
      <br />
      <img className="object-center rounded-lg border-2 mx-auto" width='275vh' height='275vh' src={player.profileImg}/>
    {/* </div> */}
    <br />
    <div>
      <h5 className="text-center">Team: {player.team}</h5>
    </div>
    <div className=" flex justify-center">
    <SignOutButton />
    </div>
  </div>
  );
};
export default PlayerPage;
{/* <Container className="top-marg">
<SignOutButton />
  <Row>
    <Col sm={12} md={6} lg={6}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="center-text">{player.firstName} {player.lastName}</Card.Title>
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
</Container> */}
