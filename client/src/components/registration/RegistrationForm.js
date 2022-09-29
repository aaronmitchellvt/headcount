import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    profileImg: {},
    firstName: "",
    lastName: "",
    team: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [file, setFile] = useState([]);

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
    console.log("on submit called");
    const newUserData = new FormData();
    newUserData.append("profileImg", userPayload.profileImg);
    newUserData.append("firstName", userPayload.firstName);
    newUserData.append("lastName", userPayload.lastName);
    newUserData.append("team", userPayload.team);
    newUserData.append("email", userPayload.email);
    newUserData.append("password", userPayload.password);
    newUserData.append("passwordConfirmation", userPayload.passwordConfirmation);

    try {
      const response = await fetch("/api/v1/users", {
        //set up a router for images
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newUserData,
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const userData = await response.json();
      setShouldRedirect(true);
    } catch (error) {
      console.error(`Error in post event Fetch: ${error.message}`);
    }
  };

  const handleImageUpload = (acceptedImage) => {
    setUserPayload({
      ...userPayload,
      profileImg: acceptedImage[0],
    });
    setFile(acceptedImage.map((file) => URL.createObjectURL(file)));
  };

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
    <>
      {/* <div classNameName="grid-container">
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
            <input type="submit" classNameName="button" value="Register" />
          </div>
        </form>
      </div> */}

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Already registered? <Link to="/user-sessions/new">Sign In</Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <form className="mb-0 space-y-6" onSubmit={onSubmit}>
              <Dropzone onDrop={handleImageUpload}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {file.length === 0 ? (
                        <div className="flex justify-center">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                            />
                          </svg>
                          <p className="text-center ml-3">Upload Profile Picture</p>{" "}
                        </div>
                      ) : (
                        <div className="flex justify-center mb-12">
                          <img
                            className="shadow rounded-full max-w-full h-auto align-middle border-none justify-center"
                            width="200vw"
                            height="200vh"
                            src={file[0]}
                          />
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>

              <div className="flex">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First</label>
                  <div className="mt-1">
                    <input
                      name="firstName"
                      type="text"
                      value={userPayload.firstName}
                      onChange={onInputChange}
                      // autocomplete="email"
                      required
                      className="p-1 mr-2 rounded border-2 w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 ml-2">Last</label>
                  <div className="mt-1">
                    <input
                      name="lastName"
                      type="text"
                      value={userPayload.lastName}
                      onChange={onInputChange}
                      // autocomplete="email"
                      required
                      className="p-1 ml-2 rounded border-2 w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    value={userPayload.emailRegexp}
                    onChange={onInputChange}
                    type="email"
                    required
                    className="p-1 mr-2 rounded border-2 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    value={userPayload.password}
                    onChange={onInputChange}
                    // autocomplete="email"
                    required
                    className="p-1 mr-2 rounded border-2 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    name="passwordConfirmation"
                    type="password"
                    value={userPayload.passwordConfirmation}
                    onChange={onInputChange}
                    // autocomplete="current-password"
                    required
                    className="p-1 mr-2 rounded border-2 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team
                </label>
                <div className="mt-1">
                  <select name="team" id="company-size" onChange={onInputChange} className="">
                    <option value="Team AG">Please select</option>
                    <option value="Team AG">Team AG</option>
                    <option value="AG Knights">AG Knights</option>
                    <option value="Blur">Blur</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
