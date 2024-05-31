import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudySpotCard.css'
// On click of card opens the page to see reviews

const images = require.context('../Assets', true);

function getImage(imageLink) {
  return images(`./${imageLink}`);
}

const StudySpotCard = ({studySpot}) => {
  return (
    // !!! add location calculations!!!
    <div className="studySpotCard">
      <img className="image" src={getImage(studySpot.imageLink)}/>
      <div className="card-details">
        <h4><b> {studySpot.name} </b></h4>
        <p>500.0 m away</p>     
      </div>
    </div>
  );
}

export default StudySpotCard;