import StudySpots from "../../SampleData/StudySpots";
import StudySpotCard from "./StudySpotCard";
import "./ListOfStudySpotCards.css";

const ListOfStudySpotCards = ({ cards }) => {
    return (
        <div className="listOfStudySpotCards">
            {cards.map((studySpot) => (
                <StudySpotCard key={studySpot.id} studySpot={studySpot} />
            ))}
        </div>
    )
}

export default ListOfStudySpotCards;