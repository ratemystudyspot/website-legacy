import React, { useEffect, useState } from 'react';
import './RecommendSpotsForms.scss';
import Input from '../../Input/Input';

// TODO: save information
function BasicInfoForm({ loading, setLoading, formInformation, setFormInformation }) {
  const [basicInfo, setBasicInfo] = useState({ title: null, description: null });

  const handleSubmit = () => {
    // console.log(basicInfo)
    //TODO: finish function
  }

  useEffect(() => {
    setLoading(false);
  }, [loading]);

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
    </div>
  )
}

export default BasicInfoForm;