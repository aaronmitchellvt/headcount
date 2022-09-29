import React from "react";
import { Link } from "react-router-dom";

const JoinedPlayerTile = (props) => {
  const playerId = props.player.id;
  const eventId = props.eventId;

  const playerName = `${props.player.firstName} ${props.player.lastName}`;
  const isLoggedInUser = playerId === props.currentUser.id;
  console.log("Current User from Player Tile: ", { isLoggedInUser, playerName });

  const checkout = async () => {
    await props.eventCheckout(eventId);
    console.log("checked out");
  };

  return (
    <div className="border-2 border-blue-700 mt-2 mb-2 flex p-2 sm:h-3 md:h-32 justify-between items-center bg-gray-100 rounded-md">
      {/* <div className="">
        <img
          className="shadow rounded-full h-1/5"
          src={props.player.profileImg}
        />
      </div> */}

      <div className="md:text-2xl lg:text-4xl p-4">
        <p>
          {playerName} at {props.player.estimatedArrivalTime}
        </p>
      </div>
      {/* {isLoggedInUser && (
        <button type="button" className="bg-red-700 text-white rounded p-3" onClick={checkout}>
          Checkout
        </button>
      )} */}

      <div className="items-center mr-3">
        <Link className="text-gray-700" to={`/players/${playerId}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
export default JoinedPlayerTile;
