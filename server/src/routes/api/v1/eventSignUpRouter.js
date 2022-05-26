import express from "express"
import { EventSignUp, Event, User } from "../../../models/index.js"

const eventSignUpRouter = new express.Router({mergeParams: true})

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

eventSignUpRouter.get("/:eventId", async (req, res) => {
  const eventId = req.params.eventId
  try {
    const event = await Event.query().findById(eventId)
    event.players = await event.$relatedQuery("users")//.withGraphFetched("users.eventSignUps")
    // console.log("Event after getting players: ", event)
    // event.signups = await event.$relatedQuery("eventSignUps")
    // console.log("Event after getting signups: ", event)
    return res.status(200).json({ event })
  } catch (error) {
    console.log("event sign up error: ", error)
    return res.status(500).json({ errors: error })
  }
})

export default eventSignUpRouter