import React from 'react'
import ListOfStudySpotCards from '../Components/StudyCard/ListOfStudySpotCards'
import './Homepage.css'
import Banner from '../Components/Banner/Banner'

const Homepage = () => {
  return (
    <div className="container">
      <Banner />
      <ListOfStudySpotCards></ListOfStudySpotCards>
    </div>
  )
}

export default Homepage