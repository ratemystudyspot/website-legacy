import { React, useState, useEffect } from 'react'
import StudySpots from "../SampleData/StudySpots";
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import SpotCardsFilter from '../Components/StudyCard/SpotCardsFilter'
import AlertComponenet from '../Components/AlertComponenet';
import './Homepage.scss'
import Banner from '../Components/Banner/Banner'
import LoaderScreen from '../Components/LoaderScreen/LoaderScreen';
import getCurrentUserLocation from '../Helpers/GetUserLocation';
import { fetchStudySpots } from '../Slices/studySpots.ts';
import { useAppDispatch } from '../hooks.ts';

const Homepage = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const [filterSelected, setFilterSelected] = useState([]);
  const [cards, setCards] = useState([]);
  const [locationAlert, setLocationAlert] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCurrentLocation = async () => {
      const result = await getCurrentUserLocation();
      setCurrentLocation(result.coords);
      setLocationAlert(result.locationAlert);
    }
    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log("HELLO?")
    dispatch(fetchStudySpots());
  }, [])

  return (
    <div className="home-box">
      <Banner filterSelected={filterSelected} setFilterSelected={setFilterSelected} cards={cards} setCards={setCards} showSearch={true} showAboutUsButton={true} />

      <div className="home-box__study-spot-filter">
        <SpotCardsFilter filterSelected={filterSelected} setFilterSelected={setFilterSelected} />
      </div>

      {(currentLocation) ? (
        <div className="home-box__study-spot-list">
          <ListOfStudySpotCards filterSelected={filterSelected} currentLocation={currentLocation} cards={cards} setCards={setCards} />
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