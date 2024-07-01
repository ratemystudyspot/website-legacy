import { React, useState, useEffect } from 'react'
import StudySpots from "../SampleData/StudySpots";
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import SpotCardsFilter from '../Components/StudyCard/SpotCardsFilter'
import AlertComponenet from '../Components/AlertComponenet';
import './Homepage.scss'
import Banner from '../Components/Banner/Banner'
import { getLocation } from '../Services/Utils/location';
import LoaderScreen from '../Components/LoaderScreen/LoaderScreen';
import { CircularProgress } from '@mui/material';


const Homepage = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const [filterOptions, setFilterOptions] = useState([]);
  const [cards, setCards] = useState([]);
  const [locationAlert, setLocationAlert] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => { // success case
        let user_lon = position.coords.longitude;
        let user_lat = position.coords.latitude;
        // setCurrentLocation([user_lon, user_lat]);
        await setCurrentLocation([user_lon, user_lat]);
      },
      async () => { // error case
        await setLocationAlert(true);
        // Alert("Location services reduced because blocked location sharing. Please share location for the best experience.", "info");
        const { location: { longitude, latitude } } = await getLocation();
        await setCurrentLocation([longitude, latitude]);
      });
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="home-box">
      <Banner filterSelected={filterOptions} onFilterSelect={setFilterOptions} cards={cards} setCards={setCards} showSearch={true} showAboutUsButton={true} />

      <div className="home-box__study-spot-filter">
        <SpotCardsFilter filterSelected={filterOptions} onFilterSelect={setFilterOptions} />
      </div>

      {(currentLocation) ? (
        <div className="home-box__study-spot-list">
          <ListOfStudySpotCards filterSelected={filterOptions} currentLocation={currentLocation} cards={cards} setCards={setCards} />
        </div>
      ) : (
        <LoaderScreen variant="white" />
      )}

      <div className="home-box__alert">
        <AlertComponenet
          collapse={locationAlert}
          setCollapse={setLocationAlert}
          severity={"warning"}
          message={"Location may be inaccurate due to blocked location access. For the best service, please allow location access. Updates will occur after page reload."}
        />
      </div>


    </div >
  )
}

export default Homepage