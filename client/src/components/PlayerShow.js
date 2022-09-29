import React, { useState, useEffect } from "react";

const PlayerShow = props => {
  console.log("hi from player show page")
  //state of user
  const [player, setPlayer] = useState({
    profileImg: {},
    firstName: "",
    lastName: "",
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
    <div className="mt-8 justify-center mx-auto">
      <h2 className="text-center">{player.firstName} {player.lastName}</h2>
      {/* <div className="object-center"> */}
        <br />
        <img className="object-center rounded-lg border-2 mx-auto" width='275vh' height='275vh' src={player.profileImg}/>
      {/* </div> */}
      <br />
      <div>
        <h5 className="text-center">Team: {player.team}</h5>
      </div>
    </div>
  )
}

export default PlayerShow