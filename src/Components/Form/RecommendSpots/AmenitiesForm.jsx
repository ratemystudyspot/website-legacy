import React, { useState } from 'react';
import './RecommendSpotsForms.scss';
import Amenities from '../../../Data/FilterOptions';
import SubmitButtons from './SubmitButtons';

// TODO: save form info
function AmenitiesForm({ setPrevPage, setCurrPage, setNextPage, formInformation, setFormInformation }) {
  const [selectAmenities, setSelectAmenities] = useState([]);
  const goBack = () => {return setCurrPage(false), setPrevPage(true)};
  const goNext = () => {return setCurrPage(false), setNextPage(true)};
  return (
    <div className="recommendspots-form">
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">What's good about the place?</h3>
      </div>
      <form className="recommendspots-form__amenities-form" >
        <div className="recommendspots-form__amenities-list">
          {
            Amenities.map(item => {
              if (item.value === "open-now") return; // don't show open now "amenity"
              return (
                <div
                  className={selectAmenities.includes(item.value) ? "recommendspots-form__amenities-item--selected" : "recommendspots-form__amenities-item"}
                  onClick={() => setSelectAmenities(prev => {
                    if (prev.includes(item.value))
                      return prev.filter(amenity => amenity !== item.value) // remove item.value from selectAmenities array
                    else
                      return [...prev, item.value] // add item.value to array selectAmenities array
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
      <SubmitButtons
        goBack={goBack}
        goNext={goNext}
      />
    </div>
  )
}

export default AmenitiesForm;