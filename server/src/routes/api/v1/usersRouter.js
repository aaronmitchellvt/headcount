import express from "express";
import passport from "passport";
import { User }  from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js"


const usersRouter = new express.Router();

usersRouter.get("/:id", async (req, res) => {
  const player = await User.query().findById(req.params.id)
  return res.status(200).json({ player })
})

// DAX usersRouter.post("/", uploadImage.single("profileImg"), async (req, res) => {

usersRouter.post("/", async (req, res) => {
  console.log(req.body)
  const { email, password, playerName, team, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, playerName, team, profileImg:req.file.location})
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
});
  // try {
  //   const persistedUser = await User.query().insertAndFetch({ email, password, team, playerName });
  //   return req.login(persistedUser, () => {
  //     return res.status(201).json({ user: persistedUser });
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(422).json({ errors: error });
  // }
  // const { email, password, team, playerName } = req.body


  
    // const data = {
    //   ...body,
    //   profileImg: req.file.location,
    // }
    // console.log("Body hitting events router: ", body)
    // console.log("data in events router", data)
    // console.log(req.file.location)


// eventsRouter.post("/", uploadImage.single("layoutImg"), async (req, res) => {
//   try {
//     const { body } = req
//     const data = {
//       ...body,
//       layoutImg: req.file.location,
//     }
//     // console.log("Body hitting events router: ", body)
//     console.log("data in events router", data)
//     console.log(req.file.location)

//     const event = await Event.query().insertAndFetch(data)
//     return res.status(201).json({ event })
//   } catch (error) {
//     return res.status(500).json({ errors: error })
//   }
// })

export default usersRouter;
