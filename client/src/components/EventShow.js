import React, { useState, useEffect } from "react";
import JoinEventForm from "./JoinEventForm.js";
import { Link } from "react-router-dom";
import JoinedPlayerTile from "./JoinedPlayerTile.js";

const EventShow = (props) => {
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    date: "",
    hours: "",
    menu: "",
    forecastDate: "",
    comments: "",
  });

  const [eventPlayers, setEventPlayers] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [temp, setTemp] = useState("Don't know yet")
  // const [eventDay, setEventDay] = useState("Too early to know!")

  const eventId = props.match.params.id;
  // if(props.user){
  //   console.log("User from app : ", props.user.email)
  // }

  // setEventDay(currentEvent.forecastDate)
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


  const eventDay = "2022-05-26"
  console.log("Event Day: ", eventDay)
  const fetchWeatherForecast = async () => {
    const response  = await fetch(`/api/v1/weather`)
    const parsedForecast = await response.json()
    const periods = parsedForecast.forecastData.properties.periods

    periods.forEach((period) => {
      const trimmedDate = period.startTime.slice(0,10)
      // console.log("trimmed date: ", trimmedDate)
      // console.log("Temperature", period.temperature)
      // console.log("Period", period)
      if(trimmedDate === eventDay && period.isDaytime) {
        console.log("MATCH!!!")
        setTemp(`${period.temperature}F - ${period.shortForecast}`)
        // weatherForecast = period.temperature
      }
      })

  }

  useEffect(() => {
    fetchWeatherForecast(),
    fetchEvent();
  }, []);

  // let eventDay = currentEvent.weather
  // console.log("Forecast outside of fetch :", weatherForecast)


  console.log("State of event players", eventPlayers);

  const playersArray = eventPlayers.map((player) => {
    return <JoinedPlayerTile player={player} />;
  });

  return (
    <section className="event-show-section">
      <div className="event-card-container">
        <div className="event-details-left">
          <h2>{currentEvent.title}</h2>
          <h3>{currentEvent.date}</h3>
          <h3>{currentEvent.hours}</h3>
          <h4>Snack Shot Menu: {currentEvent.menu}</h4>
          <h4>Weather: {temp}</h4>
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

  // const getWeatherForecast = async () => {
  //   const url = "https://api.weather.gov/gridpoints/GYX/32,21/forecast"
  //   try {
  //     const response = await fetch( url, {
  //       method: "GET"
  //     });
  //     const body = await response.json();
  //     const periods = body.properties.periods
      // periods.forEach((period) => {
      //   const trimmedDate = period.startTime.slice(0,10)
      //   if(trimmedDate === eventDay && period.isDaytime) {
      //     eventDayWeather = period.detailedForecast
      //   }
      //   // console.log("Start time: " + trimmedDate + " is day time: " + period.isDaytime)
      // })
  //       console.log("forecast for event day: ", eventDayWeather)
  //     // console.log("Forecast Periods: ", periods);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
