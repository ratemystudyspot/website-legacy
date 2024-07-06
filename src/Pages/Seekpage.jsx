import React from 'react';
import "./Seekpage.scss";
import Banner from '../Components/Banner/Banner';
import UBCMap from '../Components/UBCMap/UBCMap';
import StudySpotsData from '../Data/StudySpotsData';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
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
            onClick={() => navigate("/spots/suggest-a-spot")}
          >
            SPOT
          </button>
        </div>
        <div className="seekspot-box__map">
          <UBCMap markers={getAllLocations()} mapWidth="100%" mapHeight="100%" />
        </div>
      </div>
    </div>
  )
}

export default Seekpage;