import React, { useState } from 'react';
import "./RecommendSpotspage.scss";
import Banner from "../Components/Banner/Banner";
import LandingPage from '../Components/Form/RecommendSpots/LandingPage';
import LocationForm from '../Components/Form/RecommendSpots/LocationForm';
import ErrorPage from './Structure/Errorpage';
import { LinearProgress } from '@mui/material';

function Spotspage() {
  const [progress, setProgress] = useState(0);
  const [landingPage, setLandingPage] = useState(true);
  const [locationForm, setLocationForm] = useState(false);
  const [amenitiesForm, setAmenitiesForm] = useState(false);
  const [openingHoursForm, setOpeningHoursForm] = useState(false);
  const [basicInfoForm, setBasicInfoForm] = useState(false);
  const [picturesForm, setPicturesForm] = useState(false);

  const NavigateForms = () => {
    if (landingPage)
      return <LandingPage />
    if (locationForm)
      return <LocationForm />;
    // if (amenitiesForm) TODO: ADD THE FORMS FOR THESE
    //   return <AmenitiesForm />;
    // if (openingHoursForm)
    //   return <OpeningHoursForm />;
    // if (basicInfoForm)
    //   return <BasicInfoForm />;
    // if (picturesForm)
    //   return <PicturesForm />;
    return <ErrorPage />; // catch all
  }

  const goBack = () => {
    if (landingPage) return;
    if (locationForm) return setLocationForm(false), setLandingPage(true);
    if (amenitiesForm) return setAmenitiesForm(false), setLocationForm(true);
    if (openingHoursForm) return setOpeningHoursForm(false), setAmenitiesForm(true);
    if (basicInfoForm) return setBasicInfoForm(false), setOpeningHoursForm(true);
    if (picturesForm) return setPicturesForm(false), setBasicInfoForm(true);
  }

  return (
    <div className="recommendspot-box">
      <div className="recommendspot-box__banner">
        <Banner />
      </div>
      <NavigateForms />
      <div className="recommendspot-box__footer">

        <div className="recommendspot-box__progress-bar">
          <LinearProgress color="black" variant="determinate" value={progress} />
        </div>
        <button className="recommendspot-box__back-button" onClick={goBack}>
          Back
        </button>
        <button className="recommendspot-box__next-button">
          Next
        </button>
      </div>
    </div>
  )
}

export default Spotspage;