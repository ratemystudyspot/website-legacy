import React from 'react';
import "./Seekpage.scss";
import Banner from '../Components/Banner/Banner';
import UBCMap from '../Components/UBCMap/UBCMap';

function Seekpage() {
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
          <button className="seekspot-box__add-spots-button">SPOT</button>
        </div>
        <div className="seekspot-box__map">
          <UBCMap markerCoordinates={null} />
        </div>
      </div>
    </div>
  )
}

export default Seekpage;