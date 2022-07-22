import express from "express"
import { Event, EventSignUp } from "../../../models/index.js"
import uploadImage from "../../../services/uploadImage.js"
const eventsRouter = new express.Router()


eventsRouter.delete("/:id", async (req, res) => {
  try {
    // const event = await Event.query().findById(req.params.id)
    const eventSignUps = await EventSignUp.query().select('id', 'userId', 'eventId')
      .where('eventId', '=', req.params.id)

    console.log("deleting event signups ...")
    eventSignUps.forEach( async (eventSignUp) => {
      console.log("=> ", eventSignUp)
      await EventSignUp.query().deleteById(eventSignUp.id)
    })

    await Event.query().deleteById(req.params.id)
    console.log("Will delete id: ", req.params.id)
    res.status(200).json({message: "Event was successfully deleted"})
  } catch (error) {
    console.log(error)
  }
})

eventsRouter.get("/", async (req, res) => {
  const events = await Event.query()
  return res.status(200).json({ events })
})

eventsRouter.get("/:id", async (req, res) => {
  const eventId = req.params.id
  const event = await Event.query().findById(eventId)
  
  return res.status(200).json({ event })
})

eventsRouter.post("/", uploadImage.single("layoutImg"), async (req, res) => {
// eventsRouter.post("/", async (req, res) => {
  console.log("Body: ", req.body)
  try {
    const { body } = req
    const data = {
      ...body,
      layoutImg: req.file.location,
    }
    // console.log("Body hitting events router: ", body)
    console.log("data in events router", data)
    console.log(req.file.location)

    const event = await Event.query().insertAndFetch(data)
    return res.status(201).json({ event })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

  // const { title, hours, menu, weather, comments } = req.body
  // try{
  //   const event = await Event.query().insertAndFetch({
  //     title,
  //     hours,
  //     menu,
  //     weather,
  //     comments
  //   })
  //   res.status(201).json({ event })
  // } catch(error) {
  //   console.log(error)
  //   return res.status(500)
  // }

export default eventsRouter