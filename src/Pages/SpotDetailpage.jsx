import { React, useState, useEffect } from 'react'
import StudySpots from "../SampleData/StudySpots";
import getDistanceFromLatLonInKm from '../Helpers/GetDistanceLatLon';
import './SpotDetailpage.css'
import UBCMap from '../Components/UBCMap/UBCMap';

const SpotDetailpage = ({ studySpot }) => {
  return (

    
    <div>
      {studySpot.name}
    </div>
  )
}

export default SpotDetailpage;