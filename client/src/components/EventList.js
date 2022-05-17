import React, { useState, useEffect } from "react";
import EventTile from "./EventTile";
import NewEventForm from "./NewEventForm";

const EventList = (props) => {
  const [events, setEvents] = useState([]);

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

  if(props.user){
    console.log("User from app : ", props.user.email)
  }

  const postEvent = async (newEventData) => {
    try {
      const response = await fetch(`/api/v1/new`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newEventData),
      });
      const body = await response.json();
      setEvents(events.concat(body.event));
    } catch (error) {
      console.log(error);
    }
  };

  const eventTiles = events.map((event) => {
    return <EventTile key={event.id} {...event} />;
  });
  return (
    <div className="event-list-container">
      <div className="jumbotron">
        <h1>Events</h1>
      </div>
      <div className="event-list">{eventTiles}</div>
      <div className="event-list-form">
      <NewEventForm postEvent={postEvent} />
      </div>
    </div>
  );
};
export default EventList;
