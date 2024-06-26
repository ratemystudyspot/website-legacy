import AllStudySpots from "../../Data/StudySpots";
import StudySpotCard from "./StudySpotCard";
import "./ListOfStudySpotCards.css";
import { getSpots, getSpotsByFeatures, getSpotsByTime } from "../../Services/studySpot";
import { useEffect, useState } from "react";

const ListOfStudySpotCards = ({ filterSelected, currentLocation, cards, setCards }) => {
  const convertTimeTo24h = (time12h) => {
    const [time, modifier] = time12h.split(' ').slice(0, 2);
    let [hours, minutes, seconds] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'p.m.') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:${seconds}`;
  }

  const getCurrentDate = () => {
    const date = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayOfWeek = daysOfWeek[date.getDay()];
    const currentTime12h = date.toLocaleTimeString("en-CA", {
      timeZone: "America/Vancouver",
      timeZoneName: "long",
    });
    const currentTime24h = convertTimeTo24h(currentTime12h);
    return { currentDayOfWeek, currentTime24h };
  }

  const displayCards = () => {
    if (cards.length === 0) {
      return (
        <div style={{ // TODO: improve UI by making sure this doesn't show when then app is still loading the list of study spots
          position: 'absolute',
          top: '30vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>404: No Spots Found :/</div>
      )
    }

    if (cards.length > 0) {
      let key = 0; // added to get rid of unqiue key prop warnings in the map function
      return (
        cards.map((studySpot) => (
          <StudySpotCard key={key++} studySpot={studySpot} currentLocation={currentLocation} />
        ))
      );
    }
  }

  useEffect(() => {
    const getFilteredCards = async () => {
      try {
        const featureCards =
          (filterSelected.length === 0 || (filterSelected.length === 1 && filterSelected.includes('open-now')))
            ? AllStudySpots
            : await getSpotsByFeatures(filterSelected.filter(filter => filter !== 'open-now')); // get all spots with all selected filters (excluding open-now filter)

        if (filterSelected.includes('open-now')) { // if open-now selected, find opened spots PLUS with given filters 
          const { currentDayOfWeek, currentTime24h } = getCurrentDate();
          const openCards = await getSpotsByTime(currentDayOfWeek, currentTime24h);

          const featureCardsIDs = featureCards.map(featureCard => featureCard.id) // get ids of all spots from filters (excluding open-now filter)
          const filteredCards = openCards.filter(openCard => featureCardsIDs.includes(openCard.id)) // get all opened spots AND with given filters (excluding open-now filter)

          setCards(filteredCards);
        } else { // if code reaches this line, means that all cards are shown (dangerous code here: query search overrides this setCards line -> check Banner.jsx's search functions)
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
      {displayCards()}
    </div>
  )
}

export default ListOfStudySpotCards;