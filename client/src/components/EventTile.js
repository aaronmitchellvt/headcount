import React from "react"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const EventTile = props => {
  const eventId = props.id

  const deleteEvent = props.deleteEventFunc
  const handleDelete = () => {
    deleteEvent(eventId)
  }

  const handleEdit = () => {
    console.log("edit clicked")
  }

  const isAdmin = true
  let adminFeatures = []
  if(isAdmin) {
    adminFeatures = [
      <button type="button" className="button sign-button delete-button" onClick={handleDelete}>
        Delete
      </button>
    ]
  }

  return(
    // <div className="event-tile-container">
    //   <div className="event-tile">
    //   <h2>{props.event.title}</h2>
    //   <div className="tile-date">
    //     <h5>{props.event.date}</h5>
    //   </div>
    //   </div>
    //   <div className="event-tile-container-text">
    //     <h5><Link to ={`/events/${eventId}`}>Join Event</Link></h5>
    //     <h5>{props.event.hours}</h5>
    //     {adminFeatures}
    //   </div>
    // </div>
    <Card className="bootstrap-tile">
    <Card.Img variant="top" src="https://i.imgur.com/2ZppiGB.jpg" width="100" height="180"/>
    <Card.Body>
      <Card.Title>{props.event.title}</Card.Title>
      <Card.Text>
      {props.event.date}
      </Card.Text>
      <Button variant="outline-primary"><Link to ={`/events/${eventId}`}>Join Event</Link></Button>
    </Card.Body>
  </Card>
  )
}

export default EventTile