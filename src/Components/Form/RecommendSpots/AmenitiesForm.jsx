import React, { useState } from 'react';
import './RecommendSpotsForms.scss';
import Amenities from '../../../Data/FilterOptions';
import SubmitButtons from './SubmitButtons';

function AmenitiesForm({ setPrevPage, setCurrPage, setNextPage, formInformation, setFormInformation }) {
  const [selectedAmenities, setSelectedAmenities] = useState(formInformation.amenities);

  const handleSubmitForm = () => {
    try {
      setFormInformation(prev => ({
        ...prev,
        amenities: selectedAmenities,
      }))
    } catch (error) {
      console.error(error);
    }
  }

  const goBack = () => { return setCurrPage(false), setPrevPage(true) };
  const goNext = () => { return handleSubmitForm(), setCurrPage(false), setNextPage(true) };

  return (
    <div className="recommendspots-form">
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">What's good about the place?</h3>
        <p className="recommendspots-form__subtitle">
          You may also not select any if you feel like none of these apply to your spot.
        </p>
      </div>
      <form className="recommendspots-form__amenities-form" >
        <div className="recommendspots-form__amenities-list">
          {
            Amenities.map(item => {
              if (item.value === "open-now") return; // don't show open now "amenity"
              return (
                <div
                  className={selectedAmenities.includes(item.value) ? "recommendspots-form__amenities-item--selected" : "recommendspots-form__amenities-item"}
                  onClick={() => setSelectedAmenities(prev => {
                    if (prev.includes(item.value))
                      return prev.filter(amenity => amenity !== item.value) // remove item.value from selectedAmenities array
                    else
                      return [...prev, item.value] // add item.value to array selectedAmenities array
                  }
                  )}
                >
                  <span className="recommendspots-form__amenities-icon">
                    {item.icon}
                  </span>
                  <p className="recommendspots-form__amenities-label">
                    {item.label}
                  </p>
                </div>
              )
            })
          }
        </div>
      </form>
      <SubmitButtons goBack={goBack} goNext={goNext} />
    </div>
  )
}

export default AmenitiesForm;