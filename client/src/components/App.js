import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import "../assets/style/tailwind.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import getCurrentUser from "../services/getCurrentUser";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import EventList from "./EventList";
import EventShow from "./EventShow";
import PlayerShow from "./PlayerShow";
import PlayerPage from "./PlayerPage";
import Home from "./Home";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  let adminFlag = false
  if(currentUser && currentUser.email === "admin@email.com"){
    adminFlag = true
  }

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/new" component={NewEventForm} /> */}
        <Route exact path="/events" >
          <EventList user={currentUser} adminFlag={adminFlag} />
        </Route>

        {/* <Route exact path="/events/:id" >
          <EventShow user={currentUser} />
        </Route> */}
        <Route exact path="/players/:id" component={PlayerShow} />
        <Route exact path="/players/edit/:id" component={PlayerPage}/>

        <Route exact path="/events/:id" component={EventShow} />

        {/* <Route exact path>
          <EventTile adminFlag={adminFlag} />
        </Route> */}
        {/* <Route exact path="/players/:id" component={PlayerShow} /> */}

        {/* <Route exact path="/events/:id">
          <EventShow user={currentUser}/>
        </Route> */}
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
