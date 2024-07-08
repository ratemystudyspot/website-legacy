import React from 'react'

// TODO: send info to us somehow
function FinishedPage() {
  return (
    <div className="landing-page-box">
    <div className="landing-page-box__left-container">
      <div className="landing-page-box__description-container">
        <h1 className="landing-page-box__title">
          You're finished!
        </h1>
        <p className="landing-page-box__description-text">
          Make sure to review all the information one more time just to confirm everything before you submit your form. Thank you for suggesting a spot, our team will get back to as soon as possible, so keep an eye out on your inbox!
        </p>
      </div>
    </div>
    <div className="landing-page-box__right-container">
      <div className="landing-page-box__image-container">
        <img
          className="landing-page-box__image"
          src={require("../../Assets/people-celebrating.png")}
          alt="isometic library vector"
        />
      </div>
    </div>
  </div>
  )
}

export default FinishedPage