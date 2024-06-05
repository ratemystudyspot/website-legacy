import StudySpots from "../../SampleData/StudySpots";
import StudySpotCard from "./StudySpotCard";
import "./ListOfStudySpotCards.css";
import { getSpots, getSpotsByFeatures } from "../../Services/studySpot";
import { useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";

const ListOfStudySpotCards = ({ filterSelected, currentLocation }) => {
    const [cards, setCards] = useState([]);

    const getAllCards = async () => {
        return await getSpots();
    }
    
    useEffect(() => {
        const getFilteredCards = async () => {
            try {
                const filteredCards = await getSpotsByFeatures(filterSelected);
                const allCards = await getAllCards();
                
                (filterSelected.length === 0) ? setCards(allCards) : setCards(filteredCards);
                console.log(filterSelected.length === 0,cards, allCards,filteredCards) // de;eted later
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