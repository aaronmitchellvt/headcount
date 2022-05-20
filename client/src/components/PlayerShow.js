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
    <div>
      <h3>{player.playerName}</h3>
      <img src={player.profileImg}/>
      <h5>{player.team}</h5>
    </div>
  )
}

export default PlayerShow