import React from "react"
import { Link } from "react-router-dom"

const JoinedPlayerTile = props => {
  return(
    <div className="joined-player-tile">
      <div className="joined-player-image-container">      
        <img className="joined-player-pic" src={props.player.profileImg} />
      </div>
      <p className="joined-player-info">{props.player.playerName} at {props.player.estimatedArrivalTime}</p>
    </div>

  )
}
export default JoinedPlayerTile