import React from 'react';
import './StudySpotCard.scss';
import getDistanceFromLatLonInKm from '../../Helpers/GetDistanceLatLon';
import { useNavigate } from 'react-router-dom';


const images = require.context('../Assets', true);

function getImage(imageLink) {
  const image = (typeof (imageLink) != 'undefined') ? images(`./${imageLink}`) : images(`./404.png`)
  return image;
}

const StudySpotCard = ({ studySpot, currentLocation }) => {
  const navigate = useNavigate();
  
  const getDistance = () => {
    const user_lon = currentLocation[0];
    const user_lat = currentLocation[1];
    const spot_lon = studySpot.location.coordinates[0];
    const spot_lat = studySpot.location.coordinates[1];

    const distance = getDistanceFromLatLonInKm(user_lat, user_lon, spot_lat, spot_lon, true);
    return distance;
  }

  return (
    <div
      className="studyspot-card"
      onClick={() => navigate(`/spots/${studySpot.id}`)}>
      <img className="studyspot-card__image" src={getImage(studySpot.image_link)} />
      <div className="studyspot-card__card-details">
        <h4 className="studyspot-card__label"><b> {studySpot.name} </b></h4>
        <p className="studyspot-card__distance">{getDistance()}</p>
      </div>
    </div>
  );
}

export default StudySpotCard;