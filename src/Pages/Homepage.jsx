import { React, useState, useEffect } from 'react'
import StudySpots from "../SampleData/StudySpots";
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import SpotCardsFilter from '../Components/StudyCard/SpotCardsFilter'
import './Homepage.css'
import Banner from '../Components/Banner/Banner'

const Homepage = () => {
  const [filterOptions, setFilterOptions] = useState([]);

  const filteredCards = filterOptions.length === 0
    ? StudySpots
    : StudySpots.filter((card) =>
      filterOptions.every((filter) => card.filters.includes(filter))
    );

  // for debugging
  // useEffect(() => {
  //   console.log(filterOptions);
  // }, [filterOptions]);

  return (
    <div className="container">
      <Banner className="banner" />

      <div className='study-spot-filter'>
        <SpotCardsFilter filterSelected={filterOptions} onFilterSelect={setFilterOptions} />
      </div>

      <div className="study-spot-list">
        <ListOfStudySpotCards cards={filteredCards} />
      </div>


    </div>
  )
}

export default Homepage