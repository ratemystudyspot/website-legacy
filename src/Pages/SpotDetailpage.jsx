import React, { useState, useEffect, lazy } from 'react'
import getDistanceFromLatLonInKm from '../Helpers/GetDistanceLatLon';
import Banner from '../Components/Banner/Banner';
import { useParams } from 'react-router-dom';
import './SpotDetailpage.scss'
import filterOptions from '../Data/FilterOptions';
// import AllReviewsCard from '../Components/Review/AllReviewsCard';
import UBCMap from '../Components/UBCMap/UBCMap';
import Gallery from '../Components/Gallery/Gallery';
import LoaderScreen from '../Components/LoaderScreen/LoaderScreen';
import getCurrentUserLocation from '../Helpers/GetUserLocation';
import StudySpots from '../Data/StudySpotsData';
import { useAppDispatch, useAppSelector } from '../hooks.ts';
import { addReaction, fetchReviewsByStudySpot, clearReviews } from '../Slices/reviews.ts';
import Hashids from 'hashids';
import ChangeReviewCardPopup from '../Components/Review/ChangeReviewCardPopup.jsx';
import { getReactionsByFilter } from '../Services/reaction.js';

const AllReviewsCard = lazy(() => import('../Components/Review/AllReviewsCard'));

const files = require.context('../Components/Assets', true);

function getFile(fileLink) {
  const file = files(`./${fileLink}`);
  return file;
}

function SpotDetailpage() {
  const { id } = useParams();
  const hashids = new Hashids();
  const currentStudySpot = StudySpots.filter(studySpot => studySpot.id === parseInt(hashids.decode(id)))[0];

  const [distance, setDistance] = useState("N/A");
  const [summaryCardLoaded, setSummaryCardLoaded] = useState(false);
  // const [reviews, setReviews] = useState([]);
  const [showAddReviewCard, setShowAddReviewCard] = useState(false);
  const [showEditReviewCard, setShowEditReviewCard] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [reactionsLoaded, setReactionsLoaded] = useState(false);

  const toggleAddReviewCardVisibility = () => setShowAddReviewCard((prevState) => !prevState);
  const toggleEditReviewCardVisibility = () => setShowEditReviewCard((prevState) => !prevState);

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
    currentStudySpot?.image_links.map((fileLink) => {
      setGalleryFiles((prevGalleryFiles) => {
        try {
          const isImage = fileLink.endsWith(".png") || fileLink.endsWith(".jpg") || fileLink.endsWith(".jpeg");
          if (isImage) return prevGalleryFiles.concat([<img src={getFile(fileLink)} alt="Gallery Image" />]);

          const isVideo = fileLink.endsWith(".mp4") || fileLink.endsWith(".mov");
          if (isVideo) return prevGalleryFiles.concat([<video controls src={getFile(fileLink)} alt="Gallery Video" />]);
        } catch (error) {
          return prevGalleryFiles.concat([<img src={getFile("404-image-not-found.png")} alt="Gallery Image" />])
        }
      })
    })

    // fetch reviews
    dispatch(fetchReviewsByStudySpot(currentStudySpot?.id))
      .then((state) => {
        if (state.meta.requestStatus === "fulfilled") setReviewsLoaded(true);
      });
  }, [])

  // fetch reactions
  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const foundReactions = await Promise.all(reviews.map((review) => getReactionsByFilter({ review_id: review.id })));

        // add fetched reactions to review's redux state
        for (let i = 0; i < foundReactions.length; i++) {
          dispatch(addReaction({ reactions: foundReactions[i] }))
        }

        setReactionsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }

    if (reviewsLoaded && reviews.length > 0 && !reviews[0]?.reactions) fetchReactions();
  }, [reviewsLoaded, reviews, dispatch])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let key = 0; // added to get rid of unqiue key prop warnings in the map function
  return (
    <div style={{ visibility: (reviewsLoaded && reactionsLoaded && galleryFiles.length > 0 && summaryCardLoaded) ? 'visible' : 'hidden' }}>
      {/* {// things that need to load before shown to user
        () && (<LoaderScreen />)
      } */}
      <div className="detailed-spot-box">
        {
          (showAddReviewCard || showEditReviewCard) &&
          <ChangeReviewCardPopup
            toggleReviewCardPopupVisibility={showAddReviewCard ? toggleAddReviewCardVisibility : showEditReviewCard ? toggleEditReviewCardVisibility : null}
            change={showAddReviewCard ? "add" : showEditReviewCard ? "edit" : null}
          />
        }

        <div className='detailed-spot-box__banner'>
          <Banner showGoBackButton={true} />
        </div>
        <div className="detailed-spot-box__listing-detail">
          {/* Left Container */}
          <div className="detailed-spot-box__study-info-container">

            <section className="detailed-spot-box__gallery">
              <Gallery galleryFiles={galleryFiles} />
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
          <AllReviewsCard reviews={reviews} setSummaryCardLoaded={setSummaryCardLoaded} toggleAddReviewCardVisibility={toggleAddReviewCardVisibility} toggleEditReviewCardVisibility={toggleEditReviewCardVisibility} />
        </div>
      </div >
    </div>
  )
}

export default SpotDetailpage;