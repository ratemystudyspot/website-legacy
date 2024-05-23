import React from 'react'
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import './Homepage.css'
import Banner from '../Components/Banner/Banner'

const Homepage = () => {
  return (
    <div className="container">
      <Banner />
      
      <div className="study-spot-list">
        <ListOfStudySpotCards/>
      </div>
     
      
    </div>
  )
}

export default Homepage