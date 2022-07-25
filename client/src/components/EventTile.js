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

  const isAdmin = props.adminFlag
  let adminFeatures = []
  if(isAdmin) {
    adminFeatures = [
      <Button type="button" variant="danger" className="delete-button-event-tile"  onClick={handleDelete}>
        Delete
      </Button>
    ]
  }

  return(
    <Card className="bootstrap-tile card">
    <Card.Img variant="top" src="https://i.imgur.com/2ZppiGB.jpg" width="100" height="180"/>
    <Card.Body>
      <Card.Title>{props.event.title}</Card.Title>
      <Card.Text>
      {props.event.date}
      </Card.Text>
      <Button variant="outline-primary"><Link to ={`/events/${eventId}`}>Join Event</Link></Button>
      {adminFeatures}
    </Card.Body>
  </Card>
  )
}

export default EventTile