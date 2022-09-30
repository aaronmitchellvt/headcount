import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const TopBar = ({ user }) => {

  console.log("User: ", user)
  const unauthenticatedListItems = [
    <Nav.Link className="justify-content-end" href="/user-sessions/new">
      Sign In
    </Nav.Link>,
    <Nav.Link href="/users/new">Make Account</Nav.Link>,
  ];
  const signInLink = (
    <Nav.Link className="text-light justify-content-end" href="/user-sessions/new">
      Sign In
    </Nav.Link>
  );
  const signUpLink = (
    <Nav.Link className="text-light" href="/users/new">
      Make Account
    </Nav.Link>
  );

  const dropDown = (
    <NavDropdown className="text-light bootstrap-navs" title={"Sign In"} id="nav-dropdown">
      <NavDropdown.Item href="/user-sessions/new">Sign In</NavDropdown.Item>
      <NavDropdown.Item href="/users/new">Sign Up</NavDropdown.Item>
    </NavDropdown>
  );
  
  let playerName = "Profile"
  let playerId
  if(user && user.playerName) {
    playerId = user.id
    const stringArray = user.playerName.split(" ")
    playerName = stringArray[0]
  }

  const loggedInDropDown = (
    <NavDropdown className="text-light bootstrap-navs" title={playerName} id="nav-dropdown">
      <NavDropdown.Item><Link to={`/players/edit/${playerId}`}>Profile</Link></NavDropdown.Item>
      <NavDropdown.Item ><SignOutButton/></NavDropdown.Item>
    </NavDropdown>
  );

  const authenticatedListItems = [<SignOutButton />];

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="bootstrap-navs text-light">
      <Container>
        <Navbar.Brand className="text-light">Headcount</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/events" className="text-light">
              Events
            </Nav.Link>

            <Nav className="justify-content-end">
              <Nav.Item className="justify-content-end">
                {user ? loggedInDropDown : signUpLink}
              </Nav.Item>
              <Nav.Item className="justify-content-end">
                {user ? "" : signInLink}
              </Nav.Item>
            </Nav>

            {/* 
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
