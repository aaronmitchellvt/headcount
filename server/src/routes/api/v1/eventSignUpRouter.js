import express from "express"
import { EventSignUp, Event, User } from "../../../models/index.js"

const eventSignUpRouter = new express.Router({mergeParams: true})

eventSignUpRouter.delete("/:eventId", async (req, res) => {
  try {
    console.log("Event Id: ", req.params.eventId)
    console.log("Player Id: ", req.user.id)
    const eventRow = await EventSignUp.query().select('id', 'userId', 'eventId')
      .where('eventId', '=', req.params.eventId)
      .where('userId', '=', req.user.id)
    console.log(eventRow)
    if(eventRow && eventRow.length === 1) {
      const signupId = eventRow[0].id
      await EventSignUp.query().deleteById(signupId)
    }
    res.status(200).json({message: "successful delete"})    
  } catch (error) {
    console.log(error)
  }
})

eventSignUpRouter.post("/:eventId", async (req, res) => {
  try {
    const newEventSignUp = await EventSignUp.query().insertAndFetch({
      estimatedArrivalTime: req.body.estimatedArrivalTime, 
      userId: req.user.id, 
      eventId: req.params.eventId})
    const user = await User.query().findById(req.user.id)
    res.status(201).json({ newEventSignUp, user })
  } catch(error) {
    console.log(error)
  }
})

const addEstimatedArrivalTime = async (theEventId, players) => {
  let updatedPlayers = await Promise.all(players.map( async (player) => {
    const playerId = player.id
    const eventRow = await EventSignUp.query().select('id', 'userId', 'eventId', 'estimatedArrivalTime')
    .where('eventId', '=', theEventId)
    .where('userId', '=', playerId)
    let updatedPlayer = { ...player}
    if(eventRow && eventRow.length === 1) {
      updatedPlayer.estimatedArrivalTime = eventRow[0].estimatedArrivalTime 
    } 
    // console.log("Updated Player: ", updatedPlayer)
    // updatedPlayers.push(updatedPlayer)
    // console.log(updatedPlayers)
    return updatedPlayer
    // console.log("Row: ", eventRow)
  }))
  return updatedPlayers
}

eventSignUpRouter.get("/:eventId", async (req, res) => {
  const eventId = req.params.eventId
  try {
    let event = await Event.query().findById(eventId)
    let players = await event.$relatedQuery("users")
    let updatedPlayers = await addEstimatedArrivalTime(eventId, players)

    console.log("updated players: ", updatedPlayers)
    event.players = updatedPlayers
    

    return res.status(200).json({ event })
  } catch (error) {
    console.log("event sign up error: ", error)
    return res.status(500).json({ errors: error })
  }
})

export default eventSignUpRouter

    //.withGraphFetched("users.eventSignUps")
    // console.log("Event after getting players: ", event)
    // event.signups = await event.$relatedQuery("eventSignUps")
    // console.log("Event after getting signups: ", event)