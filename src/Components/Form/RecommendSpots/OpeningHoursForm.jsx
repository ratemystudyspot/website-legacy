import React, { useEffect, useRef, useState } from 'react';
import './RecommendSpotsForms.scss';
import Input from '../../Input/Input';
import validator from 'validator';
import SubmitButtons from './SubmitButtons';

// TODO: clean up code
function OpeningHoursForm({ setPrevPage, setCurrPage, setNextPage, formInformation, setFormInformation }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [openingHours, setOpeningHours] = useState(formInformation.openingHours);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  // boolean fns to check if the checkboxes are checked or not
  const checkedClosedBox = (day) => { return openingHours.opening[day] === "00:00" && openingHours.closing[day] === "00:00" };
  const checkedOpenedBox = (day) => { return openingHours.opening[day] === "00:00" && openingHours.closing[day] === "23:59" };

  // init closedCheckedBox and alwaysOpenedCheckBox using the boolean fns
  const [closedCheckBox, setClosedCheckBox] = useState(Array.from({ length: days.length }, (_, i) => checkedClosedBox(days[i])));
  const [alwaysOpenedCheckBox, setAlwaysOpenedCheckBox] = useState(Array.from({ length: days.length }, (_, i) => checkedOpenedBox(days[i])));

  // handle submitting form
  const handleSubmitForm = (callback, errorCallback) => {
    try {
      let totalTimes = 0; // var to check number of inputs in openingHours

      // for loops check if input is correct (in time format)
      for (const openingTimes in openingHours.opening) {
        if (!validator.isTime(openingHours.opening[openingTimes])) throw new Error("Wrong time format");
        totalTimes++;
        if (openingHours.opening[openingTimes] > openingHours.closing[openingTimes]) throw new Error("Impossible Opening Times"); // check that if user gives an appropriate opening hour (ex. cannot provide 12:00 - 10:00)
      }
      for (const closingTimes in openingHours.closing) {
        if (!validator.isTime(openingHours.closing[closingTimes])) throw new Error("Wrong time format"); totalTimes++;
      }

      if (totalTimes !== 14) throw new Error("Blank time"); // if user hasn't filled in every input, throw error

      // save information
      setFormInformation(prev => ({
        ...prev,
        openingHours: {
          opening: openingHours.opening,
          closing: openingHours.closing,
        }
      }))

      callback();
    } catch (error) {
      console.error(error);
      errorCallback();
    }
  }

  // for the goBack and goNext buttons
  const goBack = () => { return setCurrPage(false), setPrevPage(true) };
  const goNext = () => {
    handleSubmitForm(
      () => { return setCurrPage(false), setNextPage(true) }, // regular callback case
      () => { return setShowErrorMsg(true) } // error callback case
    );
  };

  // handles opening time input changes
  const handleOpeningTimes = (e, i, day) => {
    const inputTime = e.target.value;

    // set openHours
    setOpeningHours(prev => {
      // if provided "closed" time, check closed checkbox, otherwise uncheck closed checkbox
      if (inputTime === "00:00" && prev.closing[day] === "00:00") {
        setClosedCheckBox(prev => [...prev.slice(0, i), true, ...prev.slice(i + 1)]);
      } else {
        setClosedCheckBox(prev => [...prev.slice(0, i), false, ...prev.slice(i + 1)]);
      }

      // if provided "opened" time, check 24/7 checkbox, otherwise uncheck 24/7 checkbox
      if (inputTime === "00:00" && prev.closing[day] === "23:59") {
        setAlwaysOpenedCheckBox(prev => [...prev.slice(0, i), true, ...prev.slice(i + 1)]);
      } else {
        setAlwaysOpenedCheckBox(prev => [...prev.slice(0, i), false, ...prev.slice(i + 1)]);
      }

      return { // set openingHours to this object
        ...prev,
        opening: {
          ...prev.opening,
          [day]: inputTime,
        }
      }
    });
  }

  // handles closing time input changes
  const handleClosingTimes = (e, i, day) => {
    const inputTime = e.target.value;

    setOpeningHours(prev => {
      // if provided "closed" time, check closed checkbox, otherwise uncheck closed checkbox
      if (prev.opening[day] === "00:00" && inputTime === "00:00") {
        setClosedCheckBox(prev => [...prev.slice(0, i), true, ...prev.slice(i + 1)]);
      } else {
        setClosedCheckBox(prev => [...prev.slice(0, i), false, ...prev.slice(i + 1)]);
      }

      // if provided "opened" time, check 24/7 checkbox, otherwise uncheck 24/7 checkbox
      if (prev.opening[day] === "00:00" && inputTime === "23:59") {
        setAlwaysOpenedCheckBox(prev => [...prev.slice(0, i), true, ...prev.slice(i + 1)]);
      } else {
        setAlwaysOpenedCheckBox(prev => [...prev.slice(0, i), false, ...prev.slice(i + 1)]);
      }

      return { // set openingHours to this object
        ...prev,
        closing: {
          ...prev.closing,
          [day]: inputTime,
        }
      }
    });
  }

  // handle checkboxes' onClicks
  const handleCheckBox = (i, day, typeOfDay) => {
    // closed checkbox was activated
    if (typeOfDay === "closed") {
      setClosedCheckBox(prev => {
        if (!prev[i]) // if user checks closed checkbox, uncheck opened checkbox
          setAlwaysOpenedCheckBox(prev => [...prev.slice(0, i), false, ...prev.slice(i + 1)]);

        if (prev[i]) // if user unchecks closed checkbox, clear values inside inputs for that day/row
          setOpeningHours(prev => {
            return {
              closing: {
                ...prev.closing,
                [day]: "",
              },
              opening: {
                ...prev.opening,
                [day]: "",
              }
            }
          });

        return [...prev.slice(0, i), !prev[i], ...prev.slice(i + 1)]; // toggle closed checkbox
      });
    }
    // opened checkbox was activated
    if (typeOfDay === "opened") {
      setAlwaysOpenedCheckBox(prev => {
        if (!prev[i]) // if user checks opened checkbox, uncheck closed checkbox
          setClosedCheckBox(prev => [...prev.slice(0, i), false, ...prev.slice(i + 1)]);

        if (prev[i]) // if user unchecks opened checkbox, clear values inside inputs for that day/row
          setOpeningHours(prev => {
            return {
              closing: {
                ...prev.closing,
                [day]: "",
              },
              opening: {
                ...prev.opening,
                [day]: "",
              }
            }
          });

        return [...prev.slice(0, i), !prev[i], ...prev.slice(i + 1)]; // toggle opened checkbox
      });
    };

    // reflect a closed or an opened checkbox in the inputs for that day/row
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
  };

  return (
    <div className="recommendspots-form">
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">Please provide the opening hours</h3>
        {showErrorMsg && (
          <p className="recommendspots-form__openinghours-error-msg">
            Please provide appropriate times in the following format: 00:00 - 23:59.
          </p>
        )}
      </div>
      <form className="recommendspots-form__openinghours-form">
        <div className="recommendspots-form__openinghours-list">
          {days.map((day, i) =>
            <div className="recommendspots-form__openinghours-item">
              <p className="recommendspots-form__openinghours-day">{day}</p>
              <div className="recommendspots-form__opening-time-input">
                <Input
                  label="opens"
                  placeholder="00:00"
                  type="text"
                  inputValue={openingHours.opening[day]}
                  changeAction={(e) => handleOpeningTimes(e, i, day)}
                />
              </div>
              <div className="recommendspots-form__closing-time-input">
                <Input
                  label="closes"
                  placeholder="00:00"
                  type="text"
                  inputValue={openingHours.closing[day]}
                  changeAction={(e) => handleClosingTimes(e, i, day)}
                />
              </div>
              <div className="recommendspots-form__openinghours-checkbox-list">
                <div className="recommendspots-form__openinghours-checkbox-container">
                  <input
                    className="recommendspots-form__openinghours-checkbox"
                    type="checkbox"
                    checked={closedCheckBox[i]}
                    onChange={() => handleCheckBox(i, day, "closed")}
                  />
                  <label className="recommendspots-form__openinghours-checkbox-label">Closed</label>
                </div>
                <div className="recommendspots-form__openinghours-checkbox-container">
                  <input
                    className="recommendspots-form__openinghours-checkbox"
                    type="checkbox"
                    checked={alwaysOpenedCheckBox[i]}
                    onChange={() => handleCheckBox(i, day, "opened")}
                  />
                  <label className="recommendspots-form__openinghours-checkbox-label">24/7</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
      <SubmitButtons goBack={goBack} goNext={goNext} />
    </div>
  )
}

export default OpeningHoursForm;