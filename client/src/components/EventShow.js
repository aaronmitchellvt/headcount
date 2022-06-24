import React, { useState, useEffect } from "react";
import JoinEventForm from "./JoinEventForm.js";
import { Link } from "react-router-dom";
import JoinedPlayerTile from "./JoinedPlayerTile.js";
import getCurrentUser from "../services/getCurrentUser";


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
  const [temp, setTemp] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [hasCurrentUser, setHasCurrentUser] = useState(false)


  if(currentUser){
    console.log("current user id", currentUser.id)
  }

  const eventId = props.match.params.id;

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}`);
      const body = await response.json();
      const event = body.event;
      const forecastDate = event.forecastDate;
      const forecast = await fetchWeatherForecast(forecastDate);
      const forecastString = forecast ? `${forecast.temperature}F - ${forecast.shortForecast}` : "Too early to tell!"
      setCurrentEvent(event);
      setTemp(forecastString)
      let user = null
      try {
        user = await getCurrentUser()
      } catch(err) {
      }
      setCurrentUser(user)
      const foundLoggedInUser = await getEventPlayers(user)
      setHasCurrentUser(foundLoggedInUser)
    } catch (error) {
      console.log(error);
    }
  };

  const getEventPlayers = async (loggedInUser) => {
    try {
      const response = await fetch(`/api/v1/event-signups/${eventId}`);
      const body = await response.json();
      console.log("post body response: ", body.event.players);
      let foundLoggedIn = false
      const playerJoins = body.event.players.map((player) => {
        if(player.id === loggedInUser.id) {
          foundLoggedIn = true
        }
        const playerJoinInfo = {
          id: player.id,
          profileImg: player.profileImg,
          playerName: player.playerName,
          team: player.team,
          estimatedArrivalTime: player.estimatedArrivalTime,
        };
        return playerJoinInfo
      })
      setEventPlayers(playerJoins)
      return foundLoggedIn
    } catch (error) {
      console.log(error)
      return false
    }
  };

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

  const fetchWeatherForecast = async (eventDay) => {
    const response = await fetch(`/api/v1/weather`);
    const parsedForecast = await response.json();
    const periods = parsedForecast.forecastData.properties.periods;

    const foundForecast = periods.find((period) => {
      const trimmedDate = period.startTime.slice(0, 10);
      if (trimmedDate === eventDay && period.isDaytime) {
        console.log("MATCH!!!");
        return true;
      } else {
        return false
      }
    });
    console.log("Found forecast: ", foundForecast)
    return foundForecast
  };

  const eventCheckout  = async (eventId) => {
    console.log("Delete event called")
    try {
      const response = await fetch(`/api/v1/event-signups/${eventId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
      const respBody = await response.json()
      const filteredPlayers = eventPlayers.filter((player) => player.id !== currentUser.id)
      // setErrors([])
      setEventPlayers(filteredPlayers)
      // setEventPlayers([])
      // await getEventPlayers(loggedInUser)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, []);


  const playersArray = eventPlayers.map((player) => {
    return <JoinedPlayerTile currentUser={currentUser} player={player} eventId={eventId} eventCheckout={eventCheckout}/>;
  });

  console.log("has current user: ", hasCurrentUser)
  return (
    <>
      <div className="event-jumbotron">
        <h1>{currentEvent.title}</h1>
      </div>
      <section className="event-show-container">
        <div className="event">
          <h2>{currentEvent.date}</h2>
          <h3>{currentEvent.hours}</h3>
          <h4>Weather: {temp}</h4>
        </div>

        <div className="event tall">
          {showForm && !hasCurrentUser && <JoinEventForm eventId={eventId} postNewJoin={postNewJoin} />}
          <h4 className="font-theme">These players will be there</h4>
          <div players-container>{playersArray}</div>
        </div>
        <div className="event center-text">
          <h3>Prices</h3>
          <h4>BYOP - (Bring Your Own Paint)</h4>
          <h4>Entry: $25 or free when you purchase paint</h4>
          <h4>Paint: $60 per case or $55 for season pass holders</h4>
        </div>
      </section>
      <img className="event-img" src={currentEvent.layoutImg} />
    </>

    // <section className="event-show-section">
    //   <div className="event-card-container">
    //     <div className="event-details-left">
    //       <h2>{currentEvent.title}</h2>
    //       <h3>{currentEvent.date}</h3>
    //       <h3>{currentEvent.hours}</h3>
    //       <h4>Snack Shot Menu: {currentEvent.menu}</h4>
    //       <h4>Weather: {temp}</h4>
    //       <h4>Comments: {currentEvent.comments}</h4>
    //     </div>

    //     <div className="event-details-right">
    //       <div className="join-event-form-container">
    //         {showForm && <JoinEventForm eventId={eventId} postNewJoin={postNewJoin} />}
    //       </div>
    //       <h4 className="font-theme">These players will be there</h4>
    //       <div className="joined-players-list">
    //         {playersArray}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="event-layout">
    //     <img src={currentEvent.layoutImg} />
    //   </div>
    // </section>
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

      // const playerJoinInfo = {
      //   id: player.id,
      //   profileImg: body.user.profileImg,
      //   playerName: body.user.playerName,
      //   team: body.user.team,
      //   estimatedArrivalTime: body.newEventSignUp.estimatedArrivalTime,
      // };
      // setEventPlayers(eventPlayers.concat(playerJoinInfo));
      // return body.players
