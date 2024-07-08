import { React, useState, useEffect } from 'react'
import './Banner.scss'
import { FaCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LogoComponent from '../LogoComponent';
import useAuth from "../../hooks/useAuth";
import StudySpots from '../../Data/StudySpotsData';
import { logout } from '../../Services/auth';
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { searchStudySpot } from '../../Slices/studySpots.ts';
import { filterSpots } from '../../Slices/studySpots.ts';

// TODO: Turn show different buttons to an object instead!!!
const Banner = ({ filterSelected, setFilterSelected, cards, setCards, showSearch = false, showGoBackButton = false, showAboutUsButton = false, showSeekSpotButton = true, additionalStyle }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to track whether a search term has been entered into search bar
  const [isOpen, setIsOpen] = useState(false); // State to track whether the auth navbar is open or closed
  
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  // Function to handle the change in the search bar
  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Function to handle search from search bar
  // const handleSearch = async (e) => {
  //   // Perform search operation with searchTerm
  //   e.preventDefault();
  //   try {
  //     if (searchTerm.length === 0) {
  //       await setFilterSelected([]);
  //       await setCards(StudySpots);
  //     }
  //     if (searchTerm.length > 0) {
  //       const queriedStudySpots = StudySpots.filter((studySpot) => {
  //         return studySpot.name.toLowerCase().match(searchTerm);
  //       })
  //       await setFilterSelected([]);
  //       await setCards(queriedStudySpots);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSearch = async (e) => {
    // Perform search operation with searchTerm
    e.preventDefault();
    
    setFilterSelected([]);
    await dispatch(filterSpots([]));
    await dispatch(searchStudySpot({searchTerm}));
  };

  // Function to toggle the auth navbar state
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // for authorization
  const { setAuth, auth } = useAuth();
  const handleSignOut = async () => {
    await logout();
    await setAuth({});
    window.location.reload();
  }
  const handleAuth = (auth) => {
    if (auth?.user_info?.role.toString() === process.env.REACT_APP_USER_ROLE) {
      return (
        <div className="banner-box__dropdown-content">
          <Link className="banner-box__dropdown-items" to="/user/settings">Account Settings</Link>
          <a className="banner-box__dropdown-items" onClick={handleSignOut}>Sign out</a>
        </div>
      )
    } else {
      return (
        <div className="banner-box__dropdown-content">
          <Link className="banner-box__dropdown-items" to="/signup">Sign up</Link>
          <Link className="banner-box__dropdown-items" to="/login" state={{ destination: location?.pathname }}>Log in</Link>
        </div>
      )
    }
  }

  return (
    <header>
      <div className="banner-box" style={additionalStyle}>
        <div className="banner-box__left-box">
          <LogoComponent />
          {showAboutUsButton ? <button className="banner-box__button banner-box__about-button" onClick={() => navigate("/about")}>About Us</button> : null}
          {showGoBackButton ? <button className="banner-box__button banner-box__go-back-button" onClick={() => navigate("/")}>Go Back</button> : null}
        </div>

        <div className="banner-box__middle-box">
          {(showSearch)
            ? (
              <form className="banner-box__search-box" onSubmit={handleSearch}>
                <input
                  className="banner-box__input-search"
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
                  placeholder="Search study spots"
                />
                <button type="submit" className='banner-box__search-button'><FaSearch className="banner-box__icon" /></button>
              </form>
            )
            : (null)
          }
        </div>

        <div className="banner-box__right-box">
          {/* Adding study spot btn */}

          {showSeekSpotButton ? <button className="banner-box__button banner-box__suggest-button" onClick={() => navigate("/spots/seek-a-spot")}>Suggest Spot</button> : null}
          <div className={isOpen ? "banner-box__user-nav open" : "banner-box__user-nav"}>
            {/* User Navbar button */}
            <button className="banner-box__dropdown-button" onClick={toggleNavbar}>
              <GiHamburgerMenu className="banner-box__icon" />
              <FaCircleUser className="banner-box__icon" />
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