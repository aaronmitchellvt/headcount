import React from "react"
import { Link } from "react-router-dom"

const EventTile = props => {
  const eventId = props.id
  return(
    <div className="event-tile-container">
      <div className="event-tile">
      <h2>{props.event.title}</h2>
      <div className="tile-date">
        <h5>{props.event.date}</h5>
      </div>
      {/* <h5>Weather: {props.event.weather}</h5> */}
      {/* <h5>Snack Shot Menu: {props.event.menu}</h5> */}
      {/* <h5>Comments: {props.event.comments}</h5> */}
      {/* <h5>Layout: {props.event.layoutTitle}</h5> */}
      </div>
      <div className="event-tile-container-text">
        <h5><Link to ={`/events/${eventId}`}>Join Event</Link></h5>
        <h5>{props.event.hours}</h5>
      </div>
      {/* <img src={props.event.layoutImg}/> */}
    </div>
  )
}

export default EventTile