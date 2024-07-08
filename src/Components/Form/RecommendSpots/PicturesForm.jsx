import React, { useEffect, useState } from 'react';
import './RecommendSpotsForms.scss';
import DragDropFile from 'drag-drop-file-tk';

// TODO: save info
function PicturesForm({ loading, setLoading, formInformation, setFormInformation }) {
  const [pictures, setPictures] = useState([])

  const handleChange = (files) => {
    setPictures(files);
  }

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return (
    <div className="recommendspots-form">
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">Add some photos of your place</h3>
        <p className="recommendspots-form__subtitle">
          You'll need at least 2 photos. Keep in mind you can't add more later.
        </p>
      </div>
      <form className="recommendspots-form__pictures-form">
        <div className="recommendspots-form__drag-drop-area">
          <DragDropFile handleChange={handleChange} />
        </div>
      </form>
    </div>
  )
}

export default PicturesForm;