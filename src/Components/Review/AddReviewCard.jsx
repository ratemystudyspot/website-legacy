import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { createReview } from '../../Services/review';
import "./AddReviewCard.css";
import { Rating } from '@mui/material';

// TODO: all of this needs styling
const AddReviewCard = () => {
  const { auth } = useAuth();
  const [overallRating, setOverallRating] = useState('');
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
    <div className='add-review-card'>
      <form onSubmit={handleSubmit}>
        <Rating 
          name='overall-rating'
          value={overallRating}
          onChange={(event, newOverallRating) => {setOverallRating(newOverallRating)}}
          required/>

        {/* <Rating 
          name='comfort-rating'
          value={rating}
          onChange={(event, newRating) => {setRating(newRating)}}
          required/> */}
        {/* <input
          type="text"
          placeholder="Add a Rating... (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        /> */}
        <input
          type="text"
          placeholder="Add a Review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit">Submit Review</button>
      </form>
    </div >
  );
};

export default AddReviewCard;