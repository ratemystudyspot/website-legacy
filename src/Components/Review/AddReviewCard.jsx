import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import LoginForm from '../../Pages/AuthForm/LoginForm';
import { createReview } from '../../Services/review';
import "./AddReviewCard.css";
import { Rating } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AddReviewCard = ({ toggleAddReviewCardVisibility }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const [overallRating, setOverallRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [spaceRating, setSpaceRating] = useState(0);
  const [quietRating, setQuietRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = auth.user_info.id;
    const access_token = auth.access_token;
    const study_spot_id = window.location.href.split("/").at(-1);

    try {
      const rating_body = {
        quietness_rating: quietRating === 0 ? null : quietRating,
        comfort_rating: comfortRating === 0 ? null : comfortRating,
        space_rating: spaceRating === 0 ? null : spaceRating
      };
      await createReview(user_id, study_spot_id, overallRating, rating_body, comment, access_token);
      window.location.reload();
    } catch (error) {
      console.error(error); // TODO: Add proper popup error
    }
    toggleAddReviewCardVisibility();
  }

  return (
    <>
      {/* TODO: Remove add-review-card, merge with add-review-form */}
      {(Object.keys(auth).length !== 0) ? // if user is authenticated
        (
          <div className='add-review-card'>
            <form className='add-review-form' onSubmit={handleSubmit}>
              <div>
                <Rating value={overallRating} onChange={(event, newOverallRating) => { setOverallRating(newOverallRating) }} size='large' required />
              </div>
              <div className='star-container comfort-rating'>
                Comfortness
                <Rating value={comfortRating} onChange={(event, newComfortRating) => { setComfortRating(newComfortRating) }} size='large' />
              </div>
              <div className='star-container quiet-rating'>
                Quietness
                <Rating value={quietRating} onChange={(event, newQuietRating) => { setQuietRating(newQuietRating) }} size='large' />
              </div>
              <div className='star-container space-rating'>
                Space Availability
                <Rating value={spaceRating} onChange={(event, newSpaceRating) => { setSpaceRating(newSpaceRating) }} size='large' />
              </div>

              {/* <input
            type="text"
            placeholder="Add a Rating... (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          /> */}
              <textarea
                className='add-review-description'
                type="text"
                placeholder="Add a Review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <div className='add-review-button-container'>
                <button className='add-review-cancel-button' type="button" onClick={toggleAddReviewCardVisibility}>Cancel</button>
                <button className='add-review-submit-button' type="submit">Submit</button>
              </div>
            </form>
          </div>
        ) : (
          //TODO: NEEDS STYLING
          <div className="add-review-card">
            <div className="login-form">
              <h3>Please login first.</h3>
              <LoginForm destination={location?.pathname} /> {/* location?.pathname returns current path */}
              <div className='add-review-button-container'>
                <button className='add-review-cancel-button' type="button" onClick={toggleAddReviewCardVisibility}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      <div className='overlay-background' />
    </>

  );
};

export default AddReviewCard;