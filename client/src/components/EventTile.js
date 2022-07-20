import React from "react"
import { Link } from "react-router-dom"


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
    <div className="event-tile-container">
      <div className="event-tile">
      <h2>{props.event.title}</h2>
      <div className="tile-date">
        <h5>{props.event.date}</h5>
      </div>
      </div>
      <div className="event-tile-container-text">
        <h5><Link to ={`/events/${eventId}`}>Join Event</Link></h5>
        <h5>{props.event.hours}</h5>
        {adminFeatures}
      </div>
    </div>
  )
}

export default EventTile