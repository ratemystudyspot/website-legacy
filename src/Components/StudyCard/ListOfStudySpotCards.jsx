import StudySpots from "../../SampleData/StudySpots";
import StudySpotCard from "./StudySpotCard";
import "./ListOfStudySpotCards.css";
import { getSpots, getSpotsByFeatures, getSpotsByTime } from "../../Services/studySpot";
import { useEffect, useState } from "react";

const ListOfStudySpotCards = ({ filterSelected, currentLocation }) => {
  const [cards, setCards] = useState([]);

  const convertTimeTo24h = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes, seconds] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:${seconds}`;
  }

  const getCurrentDate = () => {
    const date = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayOfWeek = daysOfWeek[date.getDay()];
    const currentTime12h = date.toLocaleTimeString();
    const currentTime24h = convertTimeTo24h(currentTime12h);
    return { currentDayOfWeek, currentTime24h };
  }

  useEffect(() => {
    const getFilteredCards = async () => {
      try {
        const featureCards =
          (filterSelected.length === 0 || (filterSelected.length === 1 && filterSelected.includes('open-now')))
            ? await getSpots()
            : await getSpotsByFeatures(filterSelected.filter(filter => filter !== 'open-now')); // get all spots with all selected filters (excluding open-now filter)

        if (filterSelected.includes('open-now')) { // if open-now selected, find opened spots PLUS with given filters 
          const { currentDayOfWeek, currentTime24h } = getCurrentDate();
          const openCards = await getSpotsByTime(currentDayOfWeek, currentTime24h);
          
          const featureCardsIDs = featureCards.map(featureCard => featureCard.id) // get ids of all spots from filters (excluding open-now filter)
          const filteredCards = openCards.filter(openCard => featureCardsIDs.includes(openCard.id)) // get all opened spots AND with given filters (excluding open-now filter)

          setCards(filteredCards);
        } else { // if code reaches this line, means that all cards are shown
          const allCards = featureCards; 
          setCards(allCards);
        }
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