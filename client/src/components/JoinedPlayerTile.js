import React from "react"
import { Link } from "react-router-dom"

const JoinedPlayerTile = props => {
  return(
    <div className="joined-player-tile">
      <div className="joined-player-image-container">      
        <img className="joined-player-pic" src={props.player.profileImg} />
      </div>
      <div className="joined-player-info">
        <h5>{props.player.playerName} at {props.player.estimatedArrivalTime}</h5>
      </div>
    </div>

  )
}
export default JoinedPlayerTile