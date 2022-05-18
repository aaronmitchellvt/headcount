import React, {useState, useEffect} from "react"
import getCurrentUser from "../services/getCurrentUser";

const JoinEventForm = props => {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: ""
  });
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const [newJoin, setNewJoin] = useState({
    estimatedArrivalTime: ""
  })

  const handleChange = (event) => {
    setNewJoin({
      ...newJoin,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const clearForm = () => {
    setNewJoin({
      estimatedArrivalTime: ""
    })
  }

  const postNewJoin = props.postNewJoin
  const handleSubmit = (event) => {
    event.preventDefault()
    postNewJoin(newJoin)
    clearForm()
  }

  // const eventId = props.eventId
  // const postNewJoin = async () => {
  //   try {
  //     const response = await fetch(`/api/v1/event-signups/${eventId}`, {
  //       method: "POST",
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //       }),
  //       body: JSON.stringify(newJoin)
  //     })
  //     const body = await response.json()
  //     console.log("Body from join event form: ", body)
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  return(
    <div className="join-event-form">
      <h3>Join this event!</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Estimate Arrival Time:
          <input type="text" name="estimatedArrivalTime" onChange={handleChange} value={newJoin.estimatedArrivalTime} />
        </label>
        <div>
          <input type="submit" value="Join Event"></input>
        </div>
      </form>
    </div>
  )
}
export default JoinEventForm