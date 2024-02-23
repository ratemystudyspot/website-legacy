import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudySpotCard.css'
// On click of card opens the page to see reviews

const StudySpotCard = ({studySpot}) => {
  return (
    // <Card style={{ width: '18rem' }}>
    //   <Card.Img variant="top" src={require("../Assets/UBC_Nest_Egg.jpg")} />
    //   <Card.Body>
    //     {/* !!! studySpot.title */}
    //     <Card.Title>The Egg</Card.Title>

    //     {/* !!! studySpot.location 
    //             Use Location api to calculate distance...*/}
    //     <Card.Text>
    //       500.0 m away
    //     </Card.Text>
        
    //   </Card.Body>
    // </Card>

    <div className="studySpotCard">
      <img className="image" src={require("../Assets/UBC_Nest_Egg.jpg")} style={{width : "100%"}}/>
      <div className="container">
        <h4><b> The Egg </b></h4>
        <p>500.0 m away</p>
      </div>
    </div>
  );
}

export default StudySpotCard;