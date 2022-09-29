import React, { useState, useEffect } from "react";
import EventTile from "./EventTile";
import NewEventForm from "./NewEventForm";
import {Container, Row, Col} from "react-bootstrap"

const EventList = (props) => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await fetch(`/api/v1/events`);
      const body = await response.json();
      setEvents(body.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  console.log(props.adminFlag);

  const postEvent = async (newEventData) => {
    const newLayoutDataBody = new FormData();
    newLayoutDataBody.append("title", newEventData.title);
    newLayoutDataBody.append("date", newEventData.date);
    newLayoutDataBody.append("hours", newEventData.hours);
    newLayoutDataBody.append("menu", newEventData.menu);
    newLayoutDataBody.append("forecastDate", newEventData.forecastDate);
    newLayoutDataBody.append("layoutImg", newEventData.layoutImg);
    newLayoutDataBody.append("layoutTitle", newEventData.layoutTitle);
    newLayoutDataBody.append("comments", newEventData.comments);

    try {
      const response = await fetch("/api/v1/new", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newLayoutDataBody,
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      setEvents([...events, body.event]);
    } catch (error) {
      console.error(`Error in post event Fetch: ${error.message}`);
    }
  };

  const deleteEvent = async (eventId) => {
    console.log("Delete event called");
    try {
      const response = await fetch(`/api/v1/events/${eventId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      setEvents([]);
      await getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const eventTiles = events.map((event) => {
    return <EventTile key={event.id} event={event} id={event.id} adminFlag={props.adminFlag} deleteEventFunc={deleteEvent} />;
  });
  return (
    <div className="">
      <div className="bg-red-700">
        <h2 className="text-center text-white h-14 pt-2 pb-2">Upcoming Events</h2>
      </div>  
      <div className="flex flex-wrap -m-4 mt-8 mb-8 mr-3 ml-3">
        {eventTiles}
        {/* <Row>
          {eventTiles.map((event) => {
            return <Col sm={12} md={6} lg={4}>{event}</Col>
          })}
        </Row> */}
      </div>
        {props.adminFlag && <NewEventForm postEvent={postEvent} />}
    </div>
  );
};
export default EventList;
