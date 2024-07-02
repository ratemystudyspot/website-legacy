import { React, useState, useEffect } from 'react'
import getDistanceFromLatLonInKm from '../Helpers/GetDistanceLatLon';
import Banner from '../Components/Banner/Banner';
import { useLocation } from 'react-router-dom';
import './SpotDetailpage.scss'
import filterOptions from '../Data/FilterOptions';
import AllReviewsCard from '../Components/Review/AllReviewsCard';
import { getReviewsByStudySpot } from '../Services/review';
import UBCMap from '../Components/UBCMap/UBCMap';
import AddReviewCard from '../Components/Review/AddReviewCard';
import Gallery from '../Components/Gallery/Gallery';
import LoaderScreen from '../Components/LoaderScreen/LoaderScreen';

const images = require.context('../Components/Assets', true);

function getImage(imageLink) {
  const image = (typeof (imageLink) != 'undefined') ? images(`./${imageLink}`) : images(`./404.png`)
  return image;
}

function SpotDetailpage() {
  let location = useLocation();
  let state = location.state;

  const [summaryCardLoaded, setSummaryCardLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [showAddReviewCard, setShowAddReviewCard] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const toggleAddReviewCardVisibility = () => {
    setShowAddReviewCard((prevState) => !prevState)
  }

  const getDistance = () => {
    const user_lon = state?.currentLocation[0];
    const user_lat = state?.currentLocation[1];
    const spot_lon = state?.studySpot.location.coordinates[0];
    const spot_lat = state?.studySpot.location.coordinates[1];

    const distance = getDistanceFromLatLonInKm(user_lat, user_lon, spot_lat, spot_lon, true);
    return distance;
  }

  useEffect(() => {
    // fetch study spot images and then store in state array
    state?.studySpot?.image_links.map((image_link) => {
      setGalleryImages((prevGalleryImages) => {
        return prevGalleryImages.concat(
          [<img src={getImage(image_link)} alt="Gallery Image" />]
        )
      })
    })

    // fetch reviews
    const getReviews = async () => {
      try {
        const foundReviews = await getReviewsByStudySpot(state?.studySpot?.id);
        await setReviews(foundReviews);
        await setReviewsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }

    getReviews();
  }, [])

  let key = 0; // added to get rid of unqiue key prop warnings in the map function
  return (
    <div className="detailed-spot-box">
      <div style={{ display: showAddReviewCard ? 'block' : 'none' }}>
        <AddReviewCard toggleAddReviewCardVisibility={toggleAddReviewCardVisibility} />
      </div>

      <div className='detailed-spot-box__banner'>
        <Banner showGoBackButton={true} />
      </div>
      {(reviewsLoaded && galleryImages.length !== 0 && summaryCardLoaded) // things that need to load before shown to user
        ? (null)
        : (<LoaderScreen variant="white" />)}

      <div className="detailed-spot-box__listing-detail">
        {/* Left Container */}
        <div className="detailed-spot-box__study-info-container">

          <section className="detailed-spot-box__gallery">
            <Gallery galleryImages={galleryImages} />
          </section>

          <div className="detailed-spot-box__listing-header-box">
            <h1 className="detailed-spot-box__listing-header"><b>{state?.studySpot?.name}</b></h1>
            <p className="detailed-spot-box__distance-away">{getDistance()} away</p>
          </div>

          <section className="detailed-spot-box__ubc-map">
            <UBCMap markerCoordinates={state?.studySpot.location.coordinates} mapCenter={state?.studySpot.location.coordinates} />
          </section>

          <section className="detailed-spot-box__amenities">
            <ul>
              {filterOptions.map((filter) => {
                if (state?.studySpot?.features.includes(filter.value)) return (<li key={key++}>{filter.icon} {filter.label}</li>)
              })}
            </ul>
          </section>

        </div>  {/* Replace with loop!
          {/* Right Container */}

        <AllReviewsCard reviews={reviews} setSummaryCardLoaded={setSummaryCardLoaded} toggleAddReviewCardVisibility={toggleAddReviewCardVisibility} />
      </div>
    </div>
  )
}

export default SpotDetailpage;