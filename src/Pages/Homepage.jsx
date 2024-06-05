import { React, useState, useEffect } from 'react'
import StudySpots from "../SampleData/StudySpots";
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import SpotCardsFilter from '../Components/StudyCard/SpotCardsFilter'
import './Homepage.css'
import Banner from '../Components/Banner/Banner'

const Homepage = () => {
  const [filterOptions, setFilterOptions] = useState([]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let user_lat = position.coords.latitude;
      let user_lon = position.coords.longitude;
      setCurrentLocation([user_lat, user_lon]);
    });    
  }

  const [currentLocation, setCurrentLocation] = useState(getCurrentLocation());

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
        <ListOfStudySpotCards filterSelected={filterOptions} currentLocation={currentLocation} />
      </div>
    </div>
  )
}

export default Homepage