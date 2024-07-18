import React, { useEffect, useState } from "react"
import "./AddReviewCard.scss";
import useAuth from "../../hooks/useAuth.js";
import LoginForm from "../../Pages/AuthForm/LoginForm.jsx";
import { createReview } from "../../Services/review.js";
import { Rating } from "@mui/material";
import { useLocation } from "react-router-dom";
import { saveReview, updateReview } from "../../Slices/reviews.ts";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { IoIosClose } from "react-icons/io";
import { checkAccessTokenExpiry } from "../../Services/auth.js";
import Hashids from "hashids";

const ChangeReviewCardPopup = ({ toggleReviewCardPopupVisibility, change }) => {
  if (change !== "add" && change !== "edit")
    throw Error(`Incorrect value of change: ${change}`);

  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const hashids = new Hashids();

  const listOfReviews = useAppSelector((state) => state.reviews.value);
  const currentUserReview = (listOfReviews.filter(review => review.user_id === auth.user_info.id))[0];

  // setting states depending if adding vs editing reviews
  const [overallRating, setOverallRating] =
    useState((change === "add") ? 0 : (change === "edit") ? currentUserReview.overall_rating : null);
  const [comfortRating, setComfortRating] =
    useState((change === "add") ? 0 : (change === "edit") ? currentUserReview.comfort_rating : null);
  const [spaceRating, setSpaceRating] =
    useState((change === "add") ? 0 : (change === "edit") ? currentUserReview.space_rating : null);
  const [quietRating, setQuietRating] =
    useState((change === "add") ? 0 : (change === "edit") ? currentUserReview.quietness_rating : null);
  const [comment, setComment] =
    useState((change === "add") ? "" : (change === "edit") ? currentUserReview.comment : null);

  // protected/requires auth component requires checking if user is still authorized
  useEffect(() => {
    const expiry = checkAccessTokenExpiry(auth, setAuth);
    if (expiry) window.location.reload(); // reloading automatically handles RT b/c RT handled in App.js
  }, [toggleReviewCardPopupVisibility]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewCardInfo = {
      id: currentUserReview.id,
      user_id: auth.user_info.id,
      study_spot_id: hashids.decode(window.location.href.split("/").at(-1))[0],
      overall_rating: overallRating,
      rating_body: {
        quietness_rating: quietRating === 0 ? null : quietRating,
        comfort_rating: comfortRating === 0 ? null : comfortRating,
        space_rating: spaceRating === 0 ? null : spaceRating
      },
      comment: comment,
      access_token: auth.access_token,
    }

    // TODO: Refactor to something better
    try {
      if (change === "add") {
        const { id, ...newReviewCardInfo } = reviewCardInfo; // exclude id
        dispatch(saveReview(newReviewCardInfo));
      }
      if (change === "edit") {
        const { study_spot_id, ...newReviewCardInfo } = reviewCardInfo; // exclude study_spot_id
        dispatch(updateReview(newReviewCardInfo));
      }
    } catch (error) {
      console.error(error); // TODO: Add proper popup error
    }
    toggleReviewCardPopupVisibility();
  }

  return (
    <div className="add-review-box">
      {/* TODO: Remove add-review-card, merge with add-review-form */}
      {(Object.keys(auth).length !== 0) ? // if user is authenticated
        (
          <div className="add-review-box__card">
            <form className="add-review-box__form" onSubmit={handleSubmit}>
              <div>
                <Rating value={overallRating} onChange={(event, newOverallRating) => { setOverallRating(newOverallRating) }} size="large" required />
              </div>
              <div className="add-review-box__star-container">
                Comfortness
                <Rating value={comfortRating} onChange={(event, newComfortRating) => { setComfortRating(newComfortRating) }} size="large" />
              </div>
              <div className="add-review-box__star-container">
                Quietness
                <Rating value={quietRating} onChange={(event, newQuietRating) => { setQuietRating(newQuietRating) }} size="large" />
              </div>
              <div className="add-review-box__star-container">
                Space Availability
                <Rating value={spaceRating} onChange={(event, newSpaceRating) => { setSpaceRating(newSpaceRating) }} size="large" />
              </div>
              <textarea
                className="add-review-box__description-box"
                type="text"
                placeholder="Add a Review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <div className="add-review-box__button-container">
                <button className="add-review-box__cancel-button" type="button" onClick={toggleReviewCardPopupVisibility}>Cancel</button>
                <button className="add-review-box__submit-button" type="submit">Submit</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="add-review-box__card">
            <button className="add-review-box__exit-button" type="button" onClick={toggleReviewCardPopupVisibility}>
              <IoIosClose size={"30px"} color="#404040" />
            </button>
            <div className="add-review-box__login-form">
              <p className="login-first-text">Please login first</p>
              <div class="add-review-box__line" />
              <LoginForm destination={location?.pathname} /> {/* location?.pathname returns current path */}
            </div>
          </div>
        )}
      <div className="add-review-box__overlay-background" />
    </div>

  );
};

export default ChangeReviewCardPopup;