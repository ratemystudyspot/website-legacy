import { React, useState, useEffect } from 'react'
import getDistanceFromLatLonInKm from '../Helpers/GetDistanceLatLon';
import Banner from '../Components/Banner/Banner';
import { useParams } from 'react-router-dom';
import './SpotDetailpage.scss'
import filterOptions from '../Data/FilterOptions';
import AllReviewsCard from '../Components/Review/AllReviewsCard';
import { getReviewsByStudySpot } from '../Services/review';
import UBCMap from '../Components/UBCMap/UBCMap';
import AddReviewCard from '../Components/Review/AddReviewCard';
import Gallery from '../Components/Gallery/Gallery';
import LoaderScreen from '../Components/LoaderScreen/LoaderScreen';
import getCurrentUserLocation from '../Helpers/GetUserLocation';
import StudySpots from '../Data/StudySpotsData';
import { useAppDispatch, useAppSelector } from '../hooks.ts';
import { fetchReviewsByStudySpot } from '../Slices/reviews.ts';

const images = require.context('../Components/Assets', true);

function getImage(imageLink) {
  const image = (typeof (imageLink) != 'undefined') ? images(`./${imageLink}`) : images(`./404.png`)
  return image;
}

function SpotDetailpage() {
  const { id } = useParams();
  const currentStudySpot = StudySpots.filter(studySpot => studySpot.id === parseInt(id))[0];

  const [distance, setDistance] = useState("N/A");
  const [summaryCardLoaded, setSummaryCardLoaded] = useState(false);
  // const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [showAddReviewCard, setShowAddReviewCard] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const toggleAddReviewCardVisibility = () => {
    setShowAddReviewCard((prevState) => !prevState)
  }

  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.value);

  // fetch distance
  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const result = await getCurrentUserLocation();
        const [userLon, userLat] = result.coords;
        const [spotLon, spotLat] = currentStudySpot.location.coordinates;
        const distance = getDistanceFromLatLonInKm(userLat, userLon, spotLat, spotLon, true);
        setDistance(distance);
      } catch (error) {
        console.error('Error fetching distance:', error);
        setDistance("N/A"); // or handle error state as needed
      }
    };

    fetchDistance();
  }, [currentStudySpot]);


  useEffect(() => {

    // fetch images
    currentStudySpot?.image_links.map((image_link) => {
      setGalleryImages((prevGalleryImages) => {
        return prevGalleryImages.concat(
          [<img src={getImage(image_link)} alt="Gallery Image" />]
        )
      })
    })

    // fetch reviews
    dispatch(fetchReviewsByStudySpot(currentStudySpot?.id));
    setReviewsLoaded(true);
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
            <h1 className="detailed-spot-box__listing-header"><b>{currentStudySpot?.name}</b></h1>
            <p className="detailed-spot-box__distance-away">{distance} away</p>
          </div>

          <section className="detailed-spot-box__ubc-map">
            <UBCMap
              markers={[{ coordinates: currentStudySpot.location.coordinates }]}
              mapCenter={currentStudySpot.location.coordinates}
              mapWidth="100%"
              mapHeight="100%"
            />
          </section>

          <section className="detailed-spot-box__amenities">
            <ul>
              {filterOptions.map((filter) => {
                if (currentStudySpot?.features.includes(filter.value)) return (<li key={key++}>{filter.icon} {filter.label}</li>)
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