import React, { useState } from "react";
import Dropzone from "react-dropzone"


const NewEventForm = ({ postEvent }) => {
  const [newEvent, setEvent] = useState({
    title: "",
    date: "",
    hours: "",
    menu: "",
    forecastDate: "",
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
      date: "",
      hours: "",
      menu: "",
      forecastDate: "",
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
          Event Date | format ex. Sep 25
          <input type="text" name="date" onChange={handleInputChange} value={newEvent.date} />
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
          Date of event | format must be yyyy-mm-dd
          <input type="text" name="forecastDate" onChange={handleInputChange} value={newEvent.forecastDate} />
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
