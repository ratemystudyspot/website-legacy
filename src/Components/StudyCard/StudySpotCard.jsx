import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// On click of card opens the page to see reviews

const StudySpotCard = ({studySpot}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={require("../Assets/UBC_Nest_Egg.jpg")} />
      <Card.Body>
        {/* !!! studySpot.title */}
        <Card.Title>The Egg</Card.Title>

        {/* !!! studySpot.location 
                Use Location api to calculate distance...*/}
        <Card.Text>
          500.0 m away
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
}

export default StudySpotCard;