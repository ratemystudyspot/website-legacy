import { React, useState, useEffect } from 'react'
import StudySpots from "../SampleData/StudySpots";
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import SpotCardsFilter from '../Components/StudyCard/SpotCardsFilter'
import AlertComponenet from '../Components/AlertComponenet';
import './Homepage.css'
import Banner from '../Components/Banner/Banner'
import { getLocation } from '../Services/Utils/location';


const Homepage = () => {
  const [filterOptions, setFilterOptions] = useState([]);
  const [locationAlert, setLocationAlert] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => { // success case
        let user_lon = position.coords.longitude;
        let user_lat = position.coords.latitude;
        setCurrentLocation([user_lon, user_lat]);
      },
      async () => { // error case
        setLocationAlert(true);
        // Alert("Location services reduced because blocked location sharing. Please share location for the best experience.", "info");
        const { location: { longitude, latitude } } = await getLocation();
        setCurrentLocation([longitude, latitude]);
      });
  }

  const [currentLocation, setCurrentLocation] = useState(async () => await getCurrentLocation());

  return (
    <div className="container">

      <Banner className="banner" />

      <div className='study-spot-filter'>
        <SpotCardsFilter filterSelected={filterOptions} onFilterSelect={setFilterOptions} />
      </div>

      <div className="study-spot-list">
        <ListOfStudySpotCards filterSelected={filterOptions} currentLocation={currentLocation} />
      </div>

      <div className="alert">
        <AlertComponenet
          collapse={locationAlert}
          setCollapse={setLocationAlert}
          severity={"warning"}
          message={"Location may be inaccurate due to blocked location access. For the best service, please allow location access. Updates will occur after page reload."}
        />
      </div>


    </div>
  )
}

export default Homepage