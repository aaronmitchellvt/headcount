import React, { useState, useEffect } from "react";
import EventTile from "./EventTile";
import NewEventForm from "./NewEventForm";
import Dropzone from "react-dropzone"


const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false)

  const getEvents = async () => {
    try {
      const response = await fetch(`/api/v1/events`)
      const body = await response.json()
      setEvents(events.concat(body.events))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  console.log(props.adminFlag)

  const postEvent = async (newEventData) => {

    const newLayoutDataBody = new FormData()
    newLayoutDataBody.append("title", newEventData.title)
    newLayoutDataBody.append("date", newEventData.date)
    newLayoutDataBody.append("hours", newEventData.hours)
    newLayoutDataBody.append("menu", newEventData.menu)
    newLayoutDataBody.append("forecastDate", newEventData.forecastDate)
    newLayoutDataBody.append("layoutImg", newEventData.layoutImg)
    newLayoutDataBody.append("layoutTitle", newEventData.layoutTitle)
    newLayoutDataBody.append("comments", newEventData.comments)

    try {
      const response = await fetch("/api/v1/new", {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newLayoutDataBody
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setEvents([
        ...events,
        body.event
      ])
    } catch (error) {
      console.error(`Error in post event Fetch: ${error.message}`)
    }
  };

  const eventTiles = events.map((event) => {
    return <EventTile key={event.id} event={event} id={event.id}/>;
  });
  return (
    <div className="event-list-container">
      <div className="event-jumbotron">
        <h1>Events</h1>
      </div>
      <div className="event-list">{eventTiles}</div>
      <div className="event-list-form">
        {props.adminFlag && <NewEventForm postEvent={postEvent} />}
      </div>
    </div>
  );
};
export default EventList;
