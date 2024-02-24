import StudySpots from "../../SampleData/StudySpots";
import StudySpotCard from "./StudySpotCard";
import "./ListOfStudySpotCards.css";

const ListOfStudySpotCards = () => {
    return (
        <div className="listOfStudySpotCards">
            {StudySpots.map((studySpot) => (
                <StudySpotCard key={studySpot.id} studySpot={studySpot} />
            ))}
        </div>
    )
}

export default ListOfStudySpotCards;