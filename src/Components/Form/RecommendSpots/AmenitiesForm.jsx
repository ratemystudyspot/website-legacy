import React, { useState } from 'react';
import Amenities from '../../../Data/FilterOptions';

// TODO: save form info
function AmenitiesForm({ saveFormInformation, changeSaveFormInformation, currentFormInformation, changeFormInformation }) {
  const [selectAmenities, setSelectAmenities] = useState([]);

  return (
    <div className="recommendspots-form">
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">What's good about the place?</h3>
      </div>
      <form className="recommendspots-form__amenities-form" >
        <div className="recommendspots-form__amenities-list">
          {
            Amenities.map(item => (
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
            ))
          }
        </div>
      </form>
    </div>
  )
}

export default AmenitiesForm;