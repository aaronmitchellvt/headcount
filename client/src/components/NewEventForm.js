import React, { useState } from "react"

const NewEventForm = ({ postEvent }) => {
  const [newEvent, setEvent] = useState({
    title: "",
    hours: "",
    menu: "",
    weather: "",
    comments: ""
  })

  

  const handleInputChange = event => {
    setEvent({
      ...newEvent,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postEvent(newEvent)
    clearForm()
  }

  const clearForm = () => {
    setEvent({
      title: "",
      hours: "",
      menu: "",
      weather: "",
      comments: ""
    })
  }

  return(
    <div>
      <h1>New Event Form</h1>
      <form onSubmit={handleSubmit}>
      <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            value={newEvent.title}
          />
        </label>
        <label>
          Hours:
          <input
            type="text"
            name="hours"
            onChange={handleInputChange}
            value={newEvent.hours}
          />
        </label>
        <label>
          Menu:
          <input
            type="text"
            name="menu"
            onChange={handleInputChange}
            value={newEvent.menu}
          />
        </label>
        <label>
          Weather:
          <input
            type="text"
            name="weather"
            onChange={handleInputChange}
            value={newEvent.weather}
          />
        </label>
        <label>
          Comments:
          <input
            type="text"
            name="comments"
            onChange={handleInputChange}
            value={newEvent.comments}
          />
        </label>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default NewEventForm