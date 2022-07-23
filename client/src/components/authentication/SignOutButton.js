import React, { useState } from "react";
import { Nav } from "react-bootstrap";


const SignOutButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const signOut = async (event) => {
    event.preventDefault()
    console.log("sign out hit")
    try {
        const response = await fetch("/api/v1/user-sessions", {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const respBody = await response.json()
      setShouldRedirect(true)
      return { status: "ok" }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <Nav.Link className="text-dark" onClick={signOut}>Signout</Nav.Link>
  );
};

export default SignOutButton;
