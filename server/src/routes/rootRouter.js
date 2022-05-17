import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import eventsRouter from "./api/v1/eventsRouter.js";
import EventSignUp from "../models/EventSignUp.js";
import eventSignUpRouter from "./api/v1/eventSignUpRouter.js"
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here
rootRouter.use("/api/v1/new", eventsRouter);
rootRouter.use("/api/v1/events", eventsRouter);
rootRouter.use("/api/v1/event-signups", eventSignUpRouter)



export default rootRouter;
