import React, { useState, useEffect } from "react";

const PlayerShow = props => {
  console.log("hi from player show page")
  //state of user
  const [player, setPlayer] = useState({
    profileImg: {},
    playerName: "",
    team: ""
  })

  //get id of user and set to variable
  const playerId = props.match.params.id;

  //make a fetch user method and set the response to state
  const fetchPlayer = async () => {
    console.log("In fetch player")
    try {
      const response = await fetch(`/api/v1/users/${playerId}`);
      const body = await response.json();
      console.log("body: ", body)
      setPlayer(body.player);
    } catch (error) {
      console.log(error);
    }
  };

  //add a useEffect with fetch user method
  useEffect(() => {
    fetchPlayer()
  }, [])

  //return the jsx of user info
  return(
    <div className="player-show">
      <h3 className="center-text">{player.playerName}</h3>
      <div className="img-container-player">
        <img className="center-img" src={player.profileImg}/>
      </div>
      <div className="player-show-info">
        <h5>Team:      {player.team}</h5>
      </div>
    </div>
  )
}

export default PlayerShow