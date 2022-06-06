import React from "react"
import { Link } from "react-router-dom"

const JoinedPlayerTile = props => {
  const playerId = props.player.id
  const eventId = props.eventId

  const playerName = props.player.playerName
  const isLoggedInUser = playerId === props.currentUser.id
  console.log("Current User from Player Tile: ", {isLoggedInUser,playerName})
  
  const checkout = async () => {
    await props.eventCheckout(eventId)
    console.log("checked out")
  }

  return(
    <div className="joined-player-tile">
      <div className="joined-player-image-container">      
        <img className="joined-player-pic" src={props.player.profileImg} />
      </div>
      <div className="joined-player-info">
        <Link to={`/players/${playerId}`}> <h5>{props.player.playerName} at {props.player.estimatedArrivalTime}</h5> </Link>
      </div>
      {isLoggedInUser && <button type="button" className="button sign-button checkout-button" onClick={checkout}>
        Checkout
      </button>}
    </div>
  )
}
export default JoinedPlayerTile