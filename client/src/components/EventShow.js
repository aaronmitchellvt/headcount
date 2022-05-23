import React, { useState, useEffect } from "react";
import JoinEventForm from "./JoinEventForm.js";
import { Link } from "react-router-dom";
import JoinedPlayerTile from "./JoinedPlayerTile.js";

const EventShow = (props) => {
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    hours: "",
    menu: "",
    weather: "",
    comments: "",
  });

  const [eventPlayers, setEventPlayers] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const eventId = props.match.params.id;
  // if(props.user){
  //   console.log("User from app : ", props.user.email)
  // }

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
  //     console.log(error)
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
      if (response.ok) {
        setShowForm(false);
      }
      const body = await response.json();
      console.log("post body response: ", body);
      const playerJoinInfo = {
        id: body.user.id,
        profileImg: body.user.profileImg,
        playerName: body.user.playerName,
        team: body.user.team,
        estimatedArrivalTime: body.newEventSignUp.estimatedArrivalTime,
      };
      setEventPlayers(eventPlayers.concat(playerJoinInfo));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  console.log("State of event players", eventPlayers);

  const playersArray = eventPlayers.map((player) => {
    return <JoinedPlayerTile player={player} />;
  });

  return (
    <section className="event-show-section">
      <div className="event-card-container">
        <div className="event-details-left">
          <h2>{currentEvent.title}</h2>
          <h3>{currentEvent.hours}</h3>
          <h4>Snack Shot Menu: {currentEvent.menu}</h4>
          <h4>Weather: {currentEvent.weather}</h4>
          <h4>Comments: {currentEvent.comments}</h4>
        </div>

        <div className="event-details-right">
          <div className="join-event-form-container">
            {showForm && <JoinEventForm eventId={eventId} postNewJoin={postNewJoin} />}
          </div>
          <h5>These players will be there</h5>
          <div className="joined-players-list">
            <ul>{playersArray}</ul>
          </div>
        </div>
      </div>
      <div className="event-layout">
        <img src={currentEvent.layoutImg} />
      </div>
    </section>
  );
};

export default EventShow;

// <li key={player.id}>
//   <p>
//     <Link to={`/players/${player.id}`}>
//       {player.playerName} of {player.team} - {player.estimatedArrivalTime}
//     </Link>
//   </p>
//   <img src={player.profileImg} />
// </li>
