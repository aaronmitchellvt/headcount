import express from "express"
import { EventSignUp, Event } from "../../../models/index.js"

const eventSignUpRouter = new express.Router({mergeParams: true})

eventSignUpRouter.post("/:eventId", async (req, res) => {
  try {
    const newEventSignUp = await EventSignUp.query().insertAndFetch({
      estimatedArrivalTime: req.body.estimatedArrivalTime, 
      userId: req.user.id, 
      eventId: req.params.eventId})                
    res.status(201).json({ newEventSignUp })
  } catch(error) {
    console.log(error)
  }
})

eventSignUpRouter.get("/:eventId", async (req, res) => {
  const eventId = req.params.eventId
  try {
    const event = await Event.query().findById(eventId)
    event.players = await event.$relatedQuery("users")
    return res.status(200).json({ event: event })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default eventSignUpRouter