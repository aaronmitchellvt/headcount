import express from "express"
import { Event } from "../../../models/index.js"
import uploadImage from "../../../services/uploadImage.js"
const eventsRouter = new express.Router()

eventsRouter.get("/", async (req, res) => {
  const events = await Event.query()
  return res.status(200).json({ events })
})

eventsRouter.get("/:id", async (req, res) => {
  const event = await Event.query().findById(req.params.id)
  return res.status(200).json({ event })
})


//maybe a post for image, or maybe I can modify the post below, who knows?


eventsRouter.post("/", uploadImage.single("layoutImg"), async (req, res) => {
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
})

export default eventsRouter