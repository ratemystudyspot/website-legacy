import {React, useState} from 'react'
import './Banner.css'
import { FaCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const Banner = () => {
  // State to track whether the navbar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the navbar state
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="banner-container">
      <a className="a-logo" href="http://localhost:3000/">
        <img className="logo" src={require("../Assets/TempLogo.jpg")} alt="Temporary Logo" /> {/* CHANGE SRC AND ALT */}
      </a>
      
      <h1>banner</h1>

      <div className="user-nav">
        {/* User Navbar button */}
        <button className="dropdown-btn" onClick={toggleNavbar}>
          <GiHamburgerMenu className="icon" />
          <FaCircleUser className="icon" />
        </button>

        {/* User Navbar contents */}
        {isOpen && (
          <div class="dropdown-content">
            <a href="#">Sign up</a>
            <a href="#">Log in</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Banner