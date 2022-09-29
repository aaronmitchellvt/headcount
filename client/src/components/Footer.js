import React from "react";

const Footer = (props) => {
  return (
    <footer className="bottom-0 left-0 z-20 p-4 w-full bg-gray-900 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <ul>
          <li className="font-bold">Contact</li>
          <li>(603) 529-3524</li>
          <li>contact@agpaintball.com</li>
        </ul>

        <ul>
          <li className="font-bold">Address</li>
          <li>158 Deering Center Road </li>
          <li>Weare, New Hampshire 03281</li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
