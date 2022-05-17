import express from "express"
import { Event } from "../../../models/index.js"
const eventsRouter = new express.Router()

eventsRouter.get("/", async (req, res) => {
  const events = await Event.query()
  return res.status(200).json({ events })
})

eventsRouter.get("/:id", async (req, res) => {
  const event = await Event.query().findById(req.params.id)
  return res.status(200).json({ event })
})

eventsRouter.post("/", async (req, res) => {
  const { title, hours, menu, weather, comments } = req.body
  try{
    const event = await Event.query().insertAndFetch({
      title,
      hours,
      menu,
      weather,
      comments
    })
    res.status(201).json({ event })
  } catch(error) {
    console.log(error)
    return res.status(500)
  }
})

export default eventsRouter