import React from 'react';
import "./LandingFinishedPage.scss";
import SubmitButtons from './SubmitButtons';
import useAuth from '../../../hooks/useAuth';
import { sendSuggestionEmail } from '../../../Services/studySpot';
import { getUserByID } from '../../../Services/user';

// TODO: send info to us somehow
function FinishedPage({ setPrevPage, setCurrPage, setNextPage, formInformation }) {
  const { auth } = useAuth();
  const goBack = () => { return setCurrPage(false), setPrevPage(true) };
  const submitForm = async () => {
    try {
      const user = await getUserByID(auth?.user_info?.id, auth?.access_token);

      // converting data to FormData to upload pictures
      const formData = new FormData();
      for (const [key, value] of Object.entries({ ...formInformation, userInfo: user.data[0] })) {
        if (key === 'pictures') {
          // formData.append(key, value);
          const pictureFiles = value;
          pictureFiles.forEach((file, index) => {
            formData.append('pictures', file);
          });
        }
        formData.append(key, JSON.stringify(value));
      };

      // sendSuggestionEmail(user.data[0], { ...formInformation, userInfo: user.data[0] })
      sendSuggestionEmail(formData);
    } catch (error) {
      console.error(error);
    }
  };
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
      <SubmitButtons goBack={goBack} submitForm={submitForm} />
    </div>
  )
}

export default FinishedPage