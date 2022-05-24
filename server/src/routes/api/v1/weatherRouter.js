import express from "express"
import got from "got"

const weatherRouter = new express.Router()

const url = "https://api.weather.gov/gridpoints/GYX/32,21/forecast"

weatherRouter.get("/", async (req, res) => {
  const apiResponse = await got(url)
  const responseBody = apiResponse.body
  const forecastData = JSON.parse(responseBody)
  return res
  .set({ "Content-Type": "application/json "})
  .status(200)
  .json({ forecastData })
})

export default weatherRouter
