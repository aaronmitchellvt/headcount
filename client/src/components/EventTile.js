import React from "react"
import { Link } from "react-router-dom"

const EventTile = props => {
  const eventId = props.id
  return(
    <div className="event-tile">
      <h3>{props.title}</h3>
      <h4>{props.hours}</h4>
      <h5>Weather: {props.weather}</h5>
      <h5>Snack Shot Menu: {props.menu}</h5>
      <h5>Comments: {props.comments}</h5>
      <h5><Link to ={`/events/${eventId}`}>Join Event</Link></h5>
    </div>
  )
}

export default EventTile