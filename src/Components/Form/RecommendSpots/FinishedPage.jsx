import React from 'react';
import "./LandingFinishedPage.scss";
import SubmitButtons from './SubmitButtons';

// TODO: send info to us somehow
function FinishedPage({ setPrevPage, setCurrPage, setNextPage }) {
  const goBack = () => { return setCurrPage(false), setPrevPage(true) };
  return (
    <div className="finished-page-box">
      <div className="finished-page-box__left-container">
        <div className="finished-page-box__description-container">
          <h1 className="finished-page-box__title">
            You're finished!
          </h1>
          <p className="finished-page-box__description-text">
            Make sure to review all the information one more time just to confirm everything before you submit your form. Thank you for suggesting a spot, our team will get back to as soon as possible, so keep an eye out on your inbox!
          </p>
        </div>
      </div>
      <div className="finished-page-box__right-container">
        <div className="finished-page-box__image-container">
          <img
            className="finished-page-box__image"
            src={require("../../Assets/people-celebrating.png")}
            alt="isometic library vector"
          />
        </div>
      </div>
      <SubmitButtons
        goBack={goBack}
      />
    </div>
  )
}

export default FinishedPage