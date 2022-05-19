import React, { useState } from "react";
import Dropzone from "react-dropzone"


const NewEventForm = ({ postEvent }) => {
  const [newEvent, setEvent] = useState({
    title: "",
    hours: "",
    menu: "",
    weather: "",
    layoutTitle: "",
    layoutImg: {},
    comments: "",
  });

  const handleInputChange = (event) => {
    setEvent({
      ...newEvent,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleImageUpload = (acceptedImage) => {
    setEvent({
      ...newEvent,
      layoutImg: acceptedImage[0]
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postEvent(newEvent);
    clearForm();
  };

  const clearForm = () => {
    setEvent({
      title: "",
      hours: "",
      menu: "",
      weather: "",
      layoutTitle: "",
      layoutImg: {},
      comments: "",
    });
  };

  return (
    <div>
      <h1>New Event Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleInputChange} value={newEvent.title} />
        </label>
        <label>
          Hours:
          <input type="text" name="hours" onChange={handleInputChange} value={newEvent.hours} />
        </label>
        <label>
          Menu:
          <input type="text" name="menu" onChange={handleInputChange} value={newEvent.menu} />
        </label>
        <label>
          Weather:
          <input type="text" name="weather" onChange={handleInputChange} value={newEvent.weather} />
        </label>
        <label>
          Layout Title:
          <input
            type="text"
            name="layoutTitle"
            onChange={handleInputChange}
            value={newEvent.layoutTitle}
          />
        </label>

        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Image Layout - drag and drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>

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
  );
};

export default NewEventForm;
