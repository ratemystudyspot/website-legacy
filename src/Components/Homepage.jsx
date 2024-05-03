import React from 'react'
import ListOfStudySpotCards from './StudyCard/ListOfStudySpotCards'
import Banner from './Banner/Banner'

const Homepage = () => {
  return (
    <div className="container">
      <Banner></Banner>
      <ListOfStudySpotCards></ListOfStudySpotCards>
      
    </div>
  )
}

export default Homepage