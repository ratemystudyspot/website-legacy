import { React, useState, useEffect } from 'react'
import StudySpots from "../SampleData/StudySpots";
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import SpotCardsFilter from '../Components/StudyCard/SpotCardsFilter'
import AlertComponenet from '../Components/AlertComponenet';
import './Homepage.scss'
import Banner from '../Components/Banner/Banner'
import LoaderScreen from '../Components/LoaderScreen/LoaderScreen';
import getCurrentUserLocation from '../Helpers/GetUserLocation';

const Homepage = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const [filterOptions, setFilterOptions] = useState([]);
  const [cards, setCards] = useState([]);
  const [locationAlert, setLocationAlert] = useState(false);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const result = await getCurrentUserLocation();
      setCurrentLocation(result.coords);
      setLocationAlert(result.locationAlert);
    }
    getCurrentLocation();
  }, []);

  return (
    <div className="home-box">
      <Banner filterOptions={filterOptions} setFilterOptions={setFilterOptions} cards={cards} setCards={setCards} showSearch={true} showAboutUsButton={true} />

      <div className="home-box__study-spot-filter">
        <SpotCardsFilter filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
      </div>

      {(currentLocation) ? (
        <div className="home-box__study-spot-list">
          <ListOfStudySpotCards filterOptions={filterOptions} currentLocation={currentLocation} cards={cards} setCards={setCards} />
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