import React, { useEffect, useState } from 'react';
import "./RecommendSpotspage.scss";
import Banner from "../Components/Banner/Banner";
import LandingPage from '../Components/Form/RecommendSpots/LandingPage';
import LocationForm from '../Components/Form/RecommendSpots/LocationForm';
import AmenitiesForm from '../Components/Form/RecommendSpots/AmenitiesForm';
import ErrorPage from './Structure/Errorpage';
import { LinearProgress } from '@mui/material';

function Spotspage() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false); // TODO: add loading functionality 
  const [count, setCount] = useState(0);
  var x = 0;
  const [landingPage, setLandingPage] = useState(true);
  const [locationForm, setLocationForm] = useState(false);
  const [amenitiesForm, setAmenitiesForm] = useState(false);
  const [openingHoursForm, setOpeningHoursForm] = useState(false);
  const [basicInfoForm, setBasicInfoForm] = useState(false);
  const [picturesForm, setPicturesForm] = useState(false);
  const [formInformation, setFormInformation] = useState({
    location: [-123.2460, 49.2626],
    amenities: [],
    openingHours: {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    },
    pictures: [],
    basicInfo: {
      title: null,
      description: null,
    },
  })

  // const formInformation = React.useRef({
  //   location: [-123.2460, 49.2626],
  //   amenities: [],
  //   openingHours: {
  //     monday: null,
  //     tuesday: null,
  //     wednesday: null,
  //     thursday: null,
  //     friday: null,
  //     saturday: null,
  //     sunday: null,
  //   },
  //   pictures: [],
  //   basicInfo: {
  //     title: null,
  //     description: null,
  //   },
  // })

  const NavigateForms = () => {
    if (landingPage) {
      setProgress(0);
      return <LandingPage />
    }

    if (locationForm) {
      setProgress(100.0 / 6.0)
      return <LocationForm
        saveFormInformation={loading}
        changeSaveFormInformation={setLoading}
        currentFormInformation={formInformation}
        changeFormInformation={setFormInformation}
      />;
    }
    
    if (amenitiesForm) {
      setProgress(100.0 / 6.0 * 2)
      return <AmenitiesForm
        saveFormInformation={loading}
        changeSaveFormInformation={setLoading}
        currentFormInformation={formInformation}
        changeFormInformation={setFormInformation}
      />;
    }
    
    //TODO: ADD THE FORMS FOR THESE
    // if (openingHoursForm)
    //   return <OpeningHoursForm changeFormInformation={setFormInformation} />;
    // if (basicInfoForm)
    //   return <BasicInfoForm changeFormInformation={setFormInformation} />;
    // if (picturesForm)
    //   return <PicturesForm changeFormInformation={setFormInformation} />;
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

  const goNext = () => {
    if (landingPage) return setLandingPage(false), setLocationForm(true);
    setLoading(true);
  }

  useEffect(() => {
    console.log("both true == go next page", !loading, locationForm)
    if (!loading) {
      if (locationForm) return setLocationForm(false), setAmenitiesForm(true);
      if (amenitiesForm) return setAmenitiesForm(false), setOpeningHoursForm(true);
      if (openingHoursForm) return setOpeningHoursForm(false), setBasicInfoForm(true);
      if (basicInfoForm) return setBasicInfoForm(false), setPicturesForm(true);
      if (picturesForm) return;
    }
  }, [loading])

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
        <button
          className={landingPage ? "recommendspot-box__back-button--landing-page" : "recommendspot-box__back-button"}
          onClick={goBack}
        >
          Back
        </button>
        <button
          className={
            (loading)
              ? "recommendspot-box__next-button--loading"
              : (landingPage)
                ? "recommendspot-box__next-button--landing-page"
                : "recommendspot-box__next-button"}
          onClick={goNext}
        >
          {landingPage ? "Get started" : "Next"}
        </button>
      </div>
    </div >
  )
}

export default Spotspage;