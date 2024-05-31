import { React, useState, useEffect } from 'react'
import './Banner.css'
import { FaCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import LogoComponent from '../LogoComponent';
import useAuth from "../../hooks/useAuth";

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

  // for authorization
  const { setAuth, auth } = useAuth();
  const handleAuth = (auth) => {
    if (auth?.roles == 2004) {
      return (
        <div class="dropdown-content">
          <button onClick={() => { setAuth({}) }}>Sign out</button>
        </div>
      )
    } else {
      return (
        <div className="dropdown-content">
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Log in</Link>
        </div>
      )
    }
  }

  return (
    <header>
      <div className="banner-container">
        <div className="logo-container">
          {/* <div style={{ width: "70px", height: "70px", marginRight: "20px" }}></div> */}
          <LogoComponent />
          <Link to="/about">
            <button style={{ minWidth: "80px" }} className="about">About us</button>
          </Link>
        </div>

        <div className="middle-container">
          <form className="search-box">
            <input
              className="input-search"
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search study spots"
            />
            <button className='btn-search'><FaSearch className="icon" /></button>
          </form>
        </div>

        <div className="right-container">
          {/* Adding study spot btn */}
          <div className="sub-container">
            <Link to="/spots">
              <button style={{ minWidth: "150px" }}>Recommend Spot</button>
            </Link>
          </div>


          <div className={isOpen ? "user-nav open" : "user-nav"}>
            {/* User Navbar button */}
            <button className="dropdown-btn" onClick={toggleNavbar}>
              <GiHamburgerMenu className="icon" />
              <FaCircleUser className="icon" />
            </button>

            {/* User Navbar contents */}
            {isOpen && handleAuth(auth)}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Banner