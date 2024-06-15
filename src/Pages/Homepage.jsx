import { React, useState, useEffect } from 'react'
import StudySpots from "../SampleData/StudySpots";
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import SpotCardsFilter from '../Components/StudyCard/SpotCardsFilter'
import './Homepage.css'
import Banner from '../Components/Banner/Banner'
import { getLocation } from '../Services/Utils/location';

const Homepage = () => {
  const [filterOptions, setFilterOptions] = useState([]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => { // success case
        let user_lon = position.coords.longitude;
        let user_lat = position.coords.latitude;
        setCurrentLocation([user_lon, user_lat]);
      },
      async () => { // error case
        const { location: {longitude, latitude} } = await getLocation();
        console.log(longitude, latitude)
        setCurrentLocation([longitude, latitude]);
      });
  }

  const [currentLocation, setCurrentLocation] = useState(async () => await getCurrentLocation());

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