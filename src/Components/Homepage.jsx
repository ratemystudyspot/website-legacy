import React from 'react'
import ListOfStudySpotCards from './StudyCard/ListOfStudySpotCards'
import './Homepage.css'
import Banner from './Banner/Banner'

const Homepage = () => {
  return (
    <div className="container">
      <Banner />
      
      <ListOfStudySpotCards></ListOfStudySpotCards>
      
    </div>
  )
}

export default Homepage