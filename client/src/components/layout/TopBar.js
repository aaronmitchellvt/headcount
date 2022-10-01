import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import tailwind from "../../assets/tailwind.css";

const TopBar = ({ user }) => {
  console.log("User: ", user);
  // let playerName = "Profile";
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

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <nav className="bg-gray-900 shadow">
      <div className="px-8 mx-auto">
        <div className="flex justify-between">
          <div className="flex">
            <div>
              <a href="/events" className="flex items-center py-4 px-4 text-white font-bold no-underline">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
              </svg> */}
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
