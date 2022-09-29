import React, { useState, useEffect } from "react";
import getCurrentUser from "../services/getCurrentUser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";


const JoinEventForm = (props) => {
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
  });

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const [newJoin, setNewJoin] = useState({
    estimatedArrivalTime: "",
  });

  const handleChange = (event) => {
    setNewJoin({
      ...newJoin,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const clearForm = () => {
    setNewJoin({
      estimatedArrivalTime: "",
    });
    console.log("New join: ", newJoin)
  };

  const postNewJoin = props.postNewJoin;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit!")
    postNewJoin(newJoin);
    clearForm();
  };

  const toggler = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  let submitButton = "";
  if (toggle && newJoin.estimatedArrivalTime != "") {
    submitButton = <input className="button-join" type="submit" value="Join Event"></input>;
  }

  return (
    <>
    <h2 className="text-center mt-8">Check In!</h2>

    <div className='mt-6 flex justify-center'>
        <form onSubmit={handleSubmit}>
        <label className="block text-lg font-large text-gray-700 ml-2">Estimated Arrival Time</label>
            <input 
              name="estimatedArrivalTime" 
              className="border rounded p-2 mr-4" 
              onChange={handleChange}
              value={newJoin.estimatedArrivalTime}
              placeholder="3:00" />
            <button type="submit" className="bg-red-700 text-white p-2 rounded">Submit</button>{' '}
        </form>
      </div>
      </>
    //   <form className="join-event-form" onSubmit={handleSubmit}>
    //     <label className="white-text">
    //       Estimated Arrival Time:
    //       <input
    //         className="join-event-input"
    //         type="text"
    //         name="estimatedArrivalTime"
    //         onChange={handleChange}
    //         value={newJoin.estimatedArrivalTime}
    //       />
    //     </label>
    //     {submitButton}

    //     <label onClick={toggler} className="checkbox">
    //       {" "}
    //       *I confirm that I WILL be there*
    //       <input type="checkbox"></input>
    //     </label>
    //     {/* {
    //       if(toggle){
    //         return <input type="submit" value="Join Event"></input>
    //       }
    //     } */}
    //   </form>
    // </div>
  );
};
export default JoinEventForm;

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
