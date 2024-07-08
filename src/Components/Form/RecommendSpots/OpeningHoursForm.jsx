import React, { useEffect, useState } from 'react'
import Input from '../../Input/Input';
import validator from 'validator';

// TODO: save information
function OpeningHoursForm({ loading, setLoading, formInformation, setFormInformation }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [openingHours, setOpeningHours] = useState({
    "opening": {
      // more dicts here ...
    },
    "closing": {
      // more dicts here ...
    },
  });

  const handleSubmit = () => {
    for (const openingTimes in openingHours.opening) {
      validator.isTime(openingTimes);
    }
    for (const closingTimes in openingHours.closing) {
      validator.isTime(closingTimes)
    }
  }

  const handleOpeningTimes = (e, day) => {
    setOpeningHours(prev => {
      return {
        ...prev,
        opening: {
          ...prev.opening,
          [day]: e.target.value,
        }
      }
    });
  }

  const handleClosingTimes = (e, day) => {
    setOpeningHours(prev => {
      return {
        ...prev,
        closing: {
          ...prev.closing,
          [day]: e.target.value,
        }
      }
    });
  }

  const handleCheckBox = (day, typeOfDay) => {
    setOpeningHours(prev => {
      return {
        opening: {
          ...prev.opening,
          [day]: "00:00",
        },
        closing: {
          ...prev.closing,
          [day]: (typeOfDay === "closed") ? "00:00" : "23:59", // determine if checkbox was a "closed" or always "opened" day
        }
      }
    });
  }

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return (
    <div className="recommendspots-form">
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">Please provide the opening hours.</h3>
      </div>
      <form className="recommendspots-form__openinghours-form" onSubmit={handleSubmit}>
        <div className="recommendspots-form__openinghours-list">
          {days.map(day =>
            <div className="recommendspots-form__openinghours-item">
              <p className="recommendspots-form__openinghours-day">{day}</p>
              <div className="recommendspots-form__opening-time-input">
                <Input
                  label="opens"
                  placeholder="00:00"
                  type="text"
                  inputValue={openingHours.opening[day]}
                  changeAction={(e) => handleOpeningTimes(e, day, "opening")}
                />
              </div>
              <div className="recommendspots-form__closing-time-input">
                <Input
                  label="closes"
                  placeholder="00:00"
                  type="text"
                  inputValue={openingHours.closing[day]}
                  changeAction={(e) => handleClosingTimes(e, day, "closing")}
                />
              </div>
              <div className="recommendspots-form__openinghours-checkbox-list">
                <div className="recommendspots-form__openinghours-checkbox-container">
                  <input
                    className="recommendspots-form__openinghours-checkbox"
                    type="checkbox"
                    onClick={() => handleCheckBox(day, "closed")}
                  />
                  <label className="recommendspots-form__openinghours-checkbox-label">Closed</label>
                </div>
                <div className="recommendspots-form__openinghours-checkbox-container">
                  <input
                    className="recommendspots-form__openinghours-checkbox"
                    type="checkbox"
                    onClick={() => handleCheckBox(day, "opened")}
                  />
                  <label className="recommendspots-form__openinghours-checkbox-label">24/7</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default OpeningHoursForm;