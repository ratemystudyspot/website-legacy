import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { createReview } from '../../Services/review';



// TODO: all of this needs styling
const AddReviewCard = () => {
  const { auth } = useAuth();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = auth.user_info.id;
    const access_token = auth.access_token;
    const study_spot_id = window.location.href.split("/").at(-1);

    try {
      await createReview(user_id, study_spot_id, rating, comment, access_token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a Rating... (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
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