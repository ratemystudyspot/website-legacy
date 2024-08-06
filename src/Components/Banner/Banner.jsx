import { React, useState,} from 'react'
import './Banner.scss'
import { FaCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LogoComponent from '../LogoComponent';
import useAuth from "../../hooks/useAuth";
import { logout } from '../../Services/auth';
import { useAppDispatch } from "../../hooks.ts";
import { searchStudySpot } from '../../Slices/studySpots.ts';
import { filterSpots } from '../../Slices/studySpots.ts';

// TODO: Turn show different buttons to an object instead!!!
const Banner = ({ filterSelected, setFilterSelected, showSearch = false, showGoBackButton = false, showAboutUsButton = false, showSeekSpotButton = true, additionalStyle }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to track whether a search term has been entered into search bar
  const [isAuthNavBarOpen, setIsAuthNavBarOpen] = useState(false); // State to track whether the auth navbar is open or closed
  
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    setFilterSelected([]);
    await dispatch(filterSpots([]));
    await dispatch(searchStudySpot({searchTerm}));
  };

  const toggleNavbar = () => {
    setIsAuthNavBarOpen(!isAuthNavBarOpen);
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
                  placeholder="Search study spots"
                />
                <button type="submit" className='banner-box__search-button'><FaSearch className="banner-box__icon" /></button>
              </form>
            )
            : (null)
          }
        </div>

        <div className="banner-box__right-box">
          {showSeekSpotButton ? <button className="banner-box__button banner-box__suggest-button" onClick={() => navigate("/spots/seek-a-spot")}>Suggest Spot</button> : null}
          <div className={isAuthNavBarOpen ? "banner-box__user-nav open" : "banner-box__user-nav"}>
            <button className="banner-box__dropdown-button" onClick={toggleNavbar}>
              <GiHamburgerMenu className="banner-box__icon" />
              <FaCircleUser className="banner-box__icon" />
            </button>
            {isAuthNavBarOpen && handleAuth(auth)}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Banner