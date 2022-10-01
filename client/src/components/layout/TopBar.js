import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import tailwind from "../../assets/tailwind.css";

const TopBar = ({ user }) => {
  let playerId;
  let playerImg
  if (user) {
    playerId = user.id;
    playerImg = user.profileImg
  }
  const unauthenticatedButtons = (
    <ul className="list-none flex items-center mt-3">
      <li
        key="sign-in"
        // className="py-2 px-2.5 bg-gray-800 text-white mr-4 rounded shadow"
      >
        <Link
          className="py-1 px-1 bg-gray-800 text-white rounded shadow mr-2 hover:bg-color-black no-underline"
          to="/user-sessions/new"
        >
          Sign In
        </Link>
      </li>
      <li
        key="sign-up"
        // className="py-2 px-2.5 bg-gray-800 text-white rounded shadow"
      >
        <Link
          to="/users/new"
          className="py-1 px-1 bg-gray-800 text-white rounded shadow ml-2 hover:bg-color-black no-underline"
        >
          Sign Up
        </Link>
      </li>
    </ul>
  );
  const authenticatedButtons = <div><Link to={`/players/edit/${playerId}`}><img className = "rounded-full border-2" width="50vh" height="50vh" src={playerImg}/></Link> </div>
  // const authenticatedListItems = [<SignOutButton />];
  return (
    <nav className="bg-gray-900 shadow">
      <div className="px-8 mx-auto">
        <div className="flex justify-between">
          <div className="flex">
            <div>
              <a href="/events" className="flex items-center py-4 px-4 text-white font-bold no-underline">
                <span>Headcount</span>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {user === null ? unauthenticatedButtons : authenticatedButtons}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
