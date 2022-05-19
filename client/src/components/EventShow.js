import React, { useState, useEffect } from "react";
import JoinEventForm from "./JoinEventForm.js";
import getCurrentUser from "../services/getCurrentUser";

const EventShow = (props) => {
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    hours: "",
    menu: "",
    weather: "",
    comments: "",
  });

  const [eventPlayers, setEventPlayers] = useState([]);


  const eventId = props.match.params.id;

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}`);
      const body = await response.json();
      setCurrentEvent(body.event);
    } catch (error) {
      console.log(error);
    }
  };

  // const getEventPlayers = async () => {
  //   try {
  //     const response = await fetch(`/api/v1/event-signups/${eventId}`);
  //     const body = await response.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const postNewJoin = async (newJoinData) => {
    try {
      const response = await fetch(`/api/v1/event-signups/${eventId}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newJoinData),
      });
      const body = await response.json();
      console.log("post body response: ", body)
      const playerJoinInfo = {
        playerName: body.user.playerName,
        team: body.user.team,
        estimatedArrivalTime: body.newEventSignUp.estimatedArrivalTime
      }
      setEventPlayers(eventPlayers.concat(playerJoinInfo))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent()
  }, []);

  console.log("State of event players", eventPlayers)

  const playersArray = eventPlayers.map((player) => {
    return (
      <li key={player.id}>
        <p>
          {player.playerName} of {player.team} - {player.estimatedArrivalTime}
        </p>
      </li>
    );
  });

  return (
    <>
    <div className="event-show-container">
      <div className="event-details-left">
        <h2>{currentEvent.title}</h2>
        <h3>{currentEvent.hours}</h3>
        <h4>Snack Shot Menu: {currentEvent.menu}</h4>
        <h4>Weather: {currentEvent.weather}</h4>
        <h4>Comments: {currentEvent.comments}</h4>
      </div>

      <div className="event-details-right">
        <JoinEventForm 
          eventId={eventId} 
          postNewJoin={postNewJoin}
        />
        <h4>These players will be there</h4>
        <ul>{playersArray}</ul>
      </div>
    </div>
    <div>
      <img src={currentEvent.layoutImg}/>
    </div>
    </>

  );
};

export default EventShow;
