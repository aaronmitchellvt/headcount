import React from "react"
import { Link } from "react-router-dom"

const JoinedPlayerTile = props => {
  const playerId = props.player.id
  return(
    <div className="joined-player-tile">
      <div className="joined-player-image-container">      
        <img className="joined-player-pic" src={props.player.profileImg} />
      </div>
      <div className="joined-player-info">
        <Link to={`/players/${playerId}`}> <h5>{props.player.playerName}</h5> </Link>
      </div>
    </div>
  )
}
export default JoinedPlayerTile