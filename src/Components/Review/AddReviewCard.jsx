import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { createReview } from '../../Services/review';
import "./AddReviewCard.css";
import { Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// TODO: all of this needs styling 
// TODO: If open form and reload page, it spins inifnite
const AddReviewCard = ( {toggleAddReviewCardVisibility}) => {
  const { auth } = useAuth();
  const [overallRating, setOverallRating] = useState('');
  const [comfortRating, setComfortRating] = useState('');
  const [spaceRating, setSpaceRating] = useState('');
  const [quietRating, setQuietRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = auth.user_info.id;
    const access_token = auth.access_token;
    const study_spot_id = window.location.href.split("/").at(-1);

    try {
      const rating_body = {}; // TODO: add rating_body (only add the ratings that the user has given)
      await createReview(user_id, study_spot_id, overallRating, rating_body, comment, access_token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    {/* TODO: Remove add-review-card, merge with add-review-form */}
      <div className='add-review-card'> 
        <form className='add-review-form' onSubmit={handleSubmit}>
          <div>
            <Rating value={overallRating} onChange={(event, newOverallRating) => { setOverallRating(newOverallRating) }} size='large' required />
          </div>
          <div className='star-container comfort-rating'>
            Comfortness
            <Rating value={comfortRating} onChange={(event, newComfortRating) => { setComfortRating(newComfortRating) }} size='large'/>
          </div>
          <div className='star-container quiet-rating'>
            Quietness
            <Rating value={quietRating} onChange={(event, newQuietRating) => {setQuietRating(newQuietRating)}} size='large' />
          </div>
          <div className='star-container space-rating'>
            Space Availability
            <Rating value={spaceRating} onChange={(event, newSpaceRating) => {setSpaceRating(newSpaceRating)}} size='large' />
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
            <button className='cancel-button' type="button" onClick={toggleAddReviewCardVisibility}>Cancel</button>
            <button className='submit-button' type="submit">Submit</button>
          </div>
        </form>
      </div >
      <div className='overlay-background' />
    </>
    
  );
};

export default AddReviewCard;