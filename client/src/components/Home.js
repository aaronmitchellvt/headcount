import React from "react"
import EventList from "./EventList"
import Footer from "./Footer"
import { Button } from 'react-bootstrap';

const Home = props => {
  return(
    <div>
    <div className="home-info-container">
      <Button lg warning onClick={() => console.log("clicked")}>Test Boostrap</Button> 
      <h1>Welcome to Headcount</h1>
      <p>Headcount is designed to be a web application for Adventure Games Paintball where players can make a user profile. On the index page there will be a list of upcoming events that a player can sign up to. A player can view the details of an event and join, providing an estimated time that they will be at the field ready to play. 
        On an event page a player will be able to see details such as the hours of the day/event, the snackshot menu, and the weather for the given day. 
      </p>
    </div>
      <EventList />
      <Footer />
    </div>
  )
}
export default Home
