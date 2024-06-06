import StudySpots from "../../SampleData/StudySpots";
import StudySpotCard from "./StudySpotCard";
import "./ListOfStudySpotCards.css";
import { getSpots, getSpotsByFeatures } from "../../Services/studySpot";
import { useEffect, useState } from "react";

const ListOfStudySpotCards = ({ filterSelected, currentLocation }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getFilteredCards = async () => {
      try {
        const filteredCards = await getSpotsByFeatures(filterSelected);
        const allCards = await getSpots();

        (filterSelected.length === 0) ? setCards(allCards) : setCards(filteredCards);
      } catch (error) {
        console.error("Error fetching filtered cards:", error);
      }
    }

    getFilteredCards(filterSelected);
  }, [filterSelected]);

  return (
    <div className="listOfStudySpotCards">
      {cards.map((studySpot) => (
        <StudySpotCard studySpot={studySpot} currentLocation={currentLocation} />
      ))}
    </div>
  )
}

export default ListOfStudySpotCards;