import React from "react"
import { Link } from "react-router-dom"

const EventTile = props => {
  const eventId = props.id
  return(
    <div className="event-tile">
      <h3>{props.event.title}</h3>
      <h4>{props.event.hours}</h4>
      <h5>Weather: {props.event.weather}</h5>
      <h5>Snack Shot Menu: {props.event.menu}</h5>
      {/* <h5>Comments: {props.event.comments}</h5> */}
      <h5>Layout: {props.event.layoutTitle}</h5>
      <h5><Link to ={`/events/${eventId}`}>Join Event</Link></h5>
      <img src={props.event.layoutImg}/>
    </div>
  )
}

export default EventTile