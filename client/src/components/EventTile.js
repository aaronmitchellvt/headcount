import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const EventTile = (props) => {
  const eventId = props.id;

  const deleteEvent = props.deleteEventFunc;
  const handleDelete = () => {
    deleteEvent(eventId);
  };

  const isAdmin = props.adminFlag;
  console.log(isAdmin)
  let adminFeatures = [];
  if (isAdmin) {
    adminFeatures = [
      <button
        type="button"
        className="bg-red-600 rounded text-white"
        onClick={handleDelete}
      >
        Delete
      </button>
    ];
  }

  const images = [
    "https://i.imgur.com/TsItUPs.jpg",
    "https://i.imgur.com/qRJ221P.jpg",
    "https://i.imgur.com/uHZrjCt.jpg",
    "https://i.imgur.com/WTqQvtf.jpg",
    "https://i.imgur.com/7HaeWUD.jpg",
    "https://i.imgur.com/SOtN83I.jpg",
    "https://i.imgur.com/31dyiHT.jpg",
    "https://i.imgur.com/w26lB6r.jpg",
    "https://i.imgur.com/0idQoZk.jpg",
    "https://i.imgur.com/nAs3QWW.jpg",
  ];

  const getRandomImg = () => {
    const randomImg = images[Math.floor(Math.random() * images.length)];
    console.log("Random IMG: ", randomImg);
    return randomImg;
  };

  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-72 md:h-48 w-full object-cover object-center"
          src="https://i.imgur.com/TsItUPs.jpg"
          alt="blog"
        />
        <div className="p-6 bg-gray-100">
          <h2 className="text-base font-medium text-indigo-600 mb-1">{props.event.date}</h2>
          <h1 className="text-2xl font-semibold mb-3">{props.event.title}</h1>
          {/* <p className="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit
                                fuga! Dolores quisquam eius cum accusamus?</p> */}
          <div className="flex items-center flex-wrap ">
            <Link to={`/events/${eventId}`} className="text-indigo-600 no-underline">
              Join Event
            </Link>
            {/* <a className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0 no-underline"><Link to = {`/events/${eventId}`} className = "text-indigo-600 no-underline">Join Event</Link>
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a> */}
          </div>
          {adminFeatures}
        </div>
      </div>
    </div>
  );
};

export default EventTile;