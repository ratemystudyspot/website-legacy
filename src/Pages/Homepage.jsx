import React from 'react'
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import SpotCardsFilter from '../Components/StudyCard/SpotCardsFilter'
import './Homepage.css'
import Banner from '../Components/Banner/Banner'

const Homepage = () => {
  return (
    <div className="container">
      <Banner className="banner"/>
      
      <div className='study-spot-filter'>
        <SpotCardsFilter />
      </div>

      <div className="study-spot-list">
        <ListOfStudySpotCards/>
      </div>
     
      
    </div>
  )
}

export default Homepage