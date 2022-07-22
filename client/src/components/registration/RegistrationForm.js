import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import Dropzone from "react-dropzone";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    profileImg: {},
    playerName: "",
    team: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("on submit called")
    const newUserData = new FormData()
    newUserData.append("profileImg", userPayload.profileImg)
    newUserData.append("playerName", userPayload.playerName)
    newUserData.append("team", userPayload.team)
    newUserData.append("email", userPayload.email)
    newUserData.append("password", userPayload.password)
    newUserData.append("passwordConfirmation", userPayload.passwordConfirmation)

    try {
      const response = await fetch("/api/v1/users", {//set up a router for images
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newUserData
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const userData = await response.json()
      setShouldRedirect(true);
    } catch (error) {
      console.error(`Error in post event Fetch: ${error.message}`)
    }
  };


  const handleImageUpload = (acceptedImage) => {
    setUserPayload({
      ...userPayload,
      profileImg: acceptedImage[0]
    })
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Profile Picture - drag and drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>
          <label>
            Name
            <input type="text" name="playerName" value={userPayload.playerName} onChange={onInputChange} />
          </label>
          <label>
            Team
            <input type="text" name="team" value={userPayload.team} onChange={onInputChange} />
          </label>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
