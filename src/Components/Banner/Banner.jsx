import { React, useState } from 'react'
import './Banner.css'
import { FaCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Banner = () => {
  // State to track whether a search term has been entered into search bar
  const [searchTerm, setSearchTerm] = useState('');
  // State to track whether the auth navbar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle the change in the search bar
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle when user presses enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to handle search from search bar !!! -> NEED TO CHANGE EVENT FIRED
  const handleSearch = () => {
    // Perform search operation with searchTerm
    console.log('Searching for:', searchTerm);
    // You can implement your search logic here
  };

  // Function to toggle the auth navbar state
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="banner-container">
        <div className="logo-container">
          <a className="a-logo" href="http://localhost:3000/">
            <img className="logo" src={require("../Assets/TempLogo.jpg")} alt="Temporary Logo" /> {/* CHANGE SRC AND ALT */}
          </a>
          <button href="#" className="about">About us</button>
        </div>



        <div className="middle-container">
          <form className="form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search study spots"
            />
          </form>
        </div>

        <div className="right-container">
          {/* Adding study spot btn */}
          <div className="sub-container">
            <button>Recommend study spot</button> {/* !!! NEED TO ADD A LINK THAT THIS GOES TO */}
          </div>


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
      </div>
      <hr/>
    </header>
  )
}

export default Banner