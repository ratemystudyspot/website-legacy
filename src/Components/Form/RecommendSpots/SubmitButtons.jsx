import React, { useState, useEffect } from 'react';
import './RecommendSpotsForms.scss';

function SubmitButtons({ goBack = null, goNext = null, submitForm = null }) {
  return (
    <div className="recommendspots-form__footer">
      <button
        className={!goBack ? "recommendspots-form__back-button--landing-page" : "recommendspots-form__back-button"} // if cant go back = landing page
        onClick={goBack}
      >
        Back
      </button>
      <button
        className={
          // (loading)
          //   ? "recommendspots-form__next-button--loading"
          //   : 
          (!goBack) // if cant go back = landing page
            ? "recommendspots-form__next-button--landing-page"
            : (submitForm) // submitform = finished page
              ? "recommendspots-form__next-button--finished-page"
              : "recommendspots-form__next-button"}
        onClick={goNext || submitForm}
      >
        {(!goBack) // if cant go back = landing page
          ? "Get started"
          : (submitForm) // submitform = finished page
            ? "Suggest It"
            : "Next"}
      </button>
    </div>
  )
}

export default SubmitButtons;