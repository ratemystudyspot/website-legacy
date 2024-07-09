import React, { useEffect, useState } from 'react';
import './RecommendSpotsForms.scss';
import DragDropFile from 'drag-drop-file-tk';
import SubmitButtons from './SubmitButtons';
import { IoIosAddCircleOutline } from "react-icons/io";

function PicturesForm({ setPrevPage, setCurrPage, setNextPage, formInformation, setFormInformation }) {
  const [pictures, setPictures] = useState(formInformation.pictures);
  const [error, setError] = useState(false);

  const handleSubmitForm = (callback, errorCallback) => {
    try {
      if (pictures.length < 2) throw new Error("Not enough pictures");
      setFormInformation(prev => ({
        ...prev,
        pictures: pictures,
      }));
      callback();
    } catch (error) {
      console.error(error);
      errorCallback();
    }
  }

  const handlePicturesChange = (files) => {
    const newPictures = Array.from(files).map(file => URL.createObjectURL(file)); // init new array of pictures in URL form
    setPictures(newPictures);
  }

  const goBack = () => { return setCurrPage(false), setPrevPage(true) };
  const goNext = () => {
    handleSubmitForm(
      () => { return setCurrPage(false), setNextPage(true) },
      () => { return setError(true) }
    )
  };

  return (
    <div className="recommendspots-form">
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">Add some photos of your place</h3>
        <p className="recommendspots-form__subtitle">
          You'll need at least 2 photos. If you have submitted this form already and wish to change your photos, you'll need to reupload.
        </p>
        {error && (
          <p className="recommendspots-form__pictures-error-msg">
            Please provide at least two photos.
          </p>
        )}
      </div>
      <form className="recommendspots-form__pictures-form">
        <div className="recommendspots-form__drag-drop-area">
          <DragDropFile defaultPreview={pictures} handleChange={handlePicturesChange} />
          <span
            className={(pictures.length > 0)
              ? "recommendspots-form__dropzone-desc--none"
              : "recommendspots-form__dropzone-desc"}
          >
            <IoIosAddCircleOutline size={35} />
            Choose an image file or drag it here.
          </span>
        </div>
      </form>
      <SubmitButtons goBack={goBack} goNext={goNext} />
    </div>
  )
}

export default PicturesForm;