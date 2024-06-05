import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { TbError404 } from "react-icons/tb";
import './StudySpotCard.css'
import getDistanceFromLatLonInKm from '../../Helpers/GetDistanceLatLon';
// On click of card opens the page to see reviews

const images = require.context('../Assets', true);

function getImage(imageLink) {
  const image = (typeof(imageLink) != 'undefined') ? images(`./${imageLink}`) : images(`./404.png`)
  return image;
}

const StudySpotCard = ({studySpot, currentLocation}) => {
  const getDistance = () => {
    let user_lat = currentLocation[0];
    let user_lon = currentLocation[1];
    let spot_lon = studySpot.location.coordinates[0];
    let spot_lat = studySpot.location.coordinates[1];

    let distance = getDistanceFromLatLonInKm(user_lat,user_lon,spot_lon,spot_lat);
    if (distance >= 10) distance = Math.round(distance);

    return distance;

  }
  return (
    // !!! add location calculations!!!
    <div className="studySpotCard">
      <img className="image" src={getImage(studySpot.image_link)}/>
      <div className="card-details">
        <h4><b> {studySpot.name} </b></h4>
        <p>{getDistance()} km</p>     
      </div>
    </div>
  );
}

export default StudySpotCard;