import React, { useState } from 'react';
import './RecommendSpotsForms.scss';
import Input from '../../Input/Input';
import SubmitButtons from './SubmitButtons';

// TODO: save information
function BasicInfoForm({ setPrevPage, setCurrPage, setNextPage, formInformation, setFormInformation }) {
  const [basicInfo, setBasicInfo] = useState({ title: null, description: null });

  const handleSubmit = () => {
    // console.log(basicInfo)
    //TODO: finish function
  }

  const goBack = () => { return setCurrPage(false), setPrevPage(true) };
  const goNext = () => { return setCurrPage(false), setNextPage(true) };

  return (
    <div className="recommendspots-form">
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">Almost there! Share some basics about your place</h3>
        <p className="recommendspots-form__subtitle">
          Give as much detail as possible, it will help our and your peers' understanding of the study spot a lot more. Please be appropriate.
        </p>
      </div>
      <form className="recommendspots-form__basic-info-form" onSubmit={handleSubmit}>
        <div className="recommendspots-form__basic-info-name">
          <Input
            label="Title"
            placeholder="Give it a name..."
            inputValue={basicInfo.title}
            changeAction={(e) => setBasicInfo(prev => {
              return { ...prev, title: e.target.value }
            })}
            requiredInput={true}
          />
        </div>
        <div className="recommendspots-form__basic-info-name">
          <textarea
            className="recommendspots-form__description-box"
            type="text"
            placeholder={`Add a Description...\n\nex. Cozy Corner Cafe offers a serene and inviting environment for studying. With its comfortable seating, natural lighting, and quiet atmosphere, it's the perfect place to focus. Enjoy the calming background music and a variety of study-friendly amenities.`}
            value={basicInfo.description}
            onChange={(e) => setBasicInfo(prev => {
              return { ...prev, description: e.target.value }
            })}
            required
          />
        </div>
      </form>
      <SubmitButtons
        goBack={goBack}
        goNext={goNext}
      />
    </div>
  )
}

export default BasicInfoForm;