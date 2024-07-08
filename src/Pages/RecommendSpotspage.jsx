import React, { useEffect, useState } from 'react';
import "./RecommendSpotspage.scss";
import Banner from "../Components/Banner/Banner";
import LandingPage from '../Components/Form/RecommendSpots/LandingPage';
import LocationForm from '../Components/Form/RecommendSpots/LocationForm';
import AmenitiesForm from '../Components/Form/RecommendSpots/AmenitiesForm';
import OpeningHoursForm from '../Components/Form/RecommendSpots/OpeningHoursForm';
import BasicInfoForm from '../Components/Form/RecommendSpots/BasicInfoForm';
import PicturesForm from '../Components/Form/RecommendSpots/PicturesForm';
import FinishedPage from '../Components/Form/RecommendSpots/FinishedPage';
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
  const [finishedPage, setFinishedPage] = useState(false);
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
      return <LandingPage
        setPrevPage={null}
        setCurrPage={setLandingPage}
        setNextPage={setLocationForm}
      />
    }

    if (locationForm) {
      setProgress(100.0 / 6.0 * 1);
      return <LocationForm
        setPrevPage={setLandingPage}
        setCurrPage={setLocationForm}
        setNextPage={setAmenitiesForm}
        formInformation={formInformation}
        setFormInformation={setFormInformation}
      />;
    }

    if (amenitiesForm) {
      setProgress(100.0 / 6.0 * 2);
      return <AmenitiesForm
        setPrevPage={setLocationForm}
        setCurrPage={setAmenitiesForm}
        setNextPage={setOpeningHoursForm}
        formInformation={formInformation}
        setFormInformation={setFormInformation}
      />;
    }

    if (openingHoursForm) {
      setProgress(100.0 / 6.0 * 3);
      return <OpeningHoursForm
        setPrevPage={setAmenitiesForm}
        setCurrPage={setOpeningHoursForm}
        setNextPage={setBasicInfoForm}
        formInformation={formInformation}
        setFormInformation={setFormInformation}
      />;
    }

    if (basicInfoForm) {
      setProgress(100.0 / 6.0 * 4);
      return <BasicInfoForm
        setPrevPage={setOpeningHoursForm}
        setCurrPage={setBasicInfoForm}
        setNextPage={setPicturesForm}
        formInformation={formInformation}
        setFormInformation={setFormInformation}
      />;
    }
    if (picturesForm) {
      setProgress(100.0 / 6.0 * 5);
      return <PicturesForm
        setPrevPage={setBasicInfoForm}
        setCurrPage={setPicturesForm}
        setNextPage={setFinishedPage}
        formInformation={formInformation}
        setFormInformation={setFormInformation}
      />;
    }
    if (finishedPage) {
      setProgress(100);
      return <FinishedPage
        setPrevPage={setPicturesForm}
        setCurrPage={setFinishedPage}
        setNextPage={null}
      />;
    }

    return <ErrorPage />; // catch all
  }

  return (
    <div className="recommendspot-box">
      <div className="recommendspot-box__banner">
        <Banner />
      </div>
      <NavigateForms />
      <div className="recommendspot-box__progress-bar">
        <LinearProgress color="black" variant="determinate" value={progress} />
      </div>
    </div>
  )
}

export default Spotspage;