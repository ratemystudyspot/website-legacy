import React, { useState } from 'react';
import "./Seekpage.scss";
import Banner from '../Components/Banner/Banner';
import UBCMap from '../Components/UBCMap/UBCMap';
import StudySpotsData from '../Data/StudySpotsData';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkAccessTokenExpiry } from '../Services/auth';
import useAuth from '../hooks/useAuth';
import LoginForm from "./AuthForm/LoginForm";
import { IoIosClose } from "react-icons/io";

const getAllLocations = () => {
  const allLocations = [];
  StudySpotsData.map((studySpot) => {
    allLocations.push({
      label: studySpot.name,
      coordinates: studySpot.location.coordinates
    });
  })
  return allLocations;
}

function Seekpage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = () => {
    const expired = checkAccessTokenExpiry(auth, setAuth);

    if (expired) return window.location.reload(); // if user's AT is expired, reload to check if RT is expired
    if (Object.keys(auth).length === 0) return setShowLoginForm(true); // if user isn't logged in

    navigate("/spots/suggest-a-spot");
  }

  return (
    <>
      <div className="seekspot-box">
        <Banner showGoBackButton={true} showSeekSpotButton={false} />
        <div className="seekspot-box__left-container">
          <h1 className="seekspot-box__left-title">
            <span className="seekspot-box__text--1">Suggest </span>
            <span className="seekspot-box__text--2">a </span>
            <span className="seekspot-box__text--3">Study </span>
            <span className="seekspot-box__text--4">Spot</span>
          </h1>
        </div>
        <div className="seekspot-box__right-container">
          <div className="seekspot-box__right-header">
            <h3 className="seekspot-box__right-title">help us out, add a</h3>
            <button
              className="seekspot-box__add-spots-button"
              onClick={handleNavigation}
            >
              SPOT
            </button>
          </div>
          <div className="seekspot-box__map">
            <UBCMap markers={getAllLocations()} mapWidth="100%" mapHeight="100%" />
          </div>
        </div>
      </div>
      {showLoginForm && (
        <div className="seekspot-popup">
          <div className="seekspot-popup__card">
            <button
              className="seekspot-popup__exit-button"
              type="button"
              onClick={() => setShowLoginForm(false)}
            >
              <IoIosClose size={"30px"} color="#404040" />
            </button >
            <div className="seekspot-popup__login-form">
              <p className="login-first-text">Please login first</p>
              <div class="seekspot-popup__line" />
              <LoginForm destination={location?.pathname} /> {/* location?.pathname returns current path */}
            </div>
          </div>
          <div className="seekspot-popup__overlay-background" /> {/* background */}
        </div>
      )}
    </>
  )
}

export default Seekpage;