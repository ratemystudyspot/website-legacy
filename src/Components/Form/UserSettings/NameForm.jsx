import React, { useEffect, useState } from 'react';
import './SettingsForms.scss';
import Input from '../../Input/Input';
import useAuth from '../../../hooks/useAuth';
import { updateUser } from '../../../Services/user';

function NameForm({ userInfo, showForm, setShowForm, blockForm }) {
  const { auth } = useAuth();
  const [name, setName] = useState(userInfo?.name);

  const savingFullName = async (e) => {
    try {
      const { firstName, lastName } = { firstName: e.target.firstName.value, lastName: e.target.lastName.value };
      const fullName = `${firstName} ${lastName}`;
      const id = auth?.user_info?.id;
      setName(fullName);

      await updateUser({ id, name: fullName }, auth?.access_token);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setName(userInfo?.name);
  }, [userInfo])

  return (
    <div className="settings-form">
      {(showForm)
        ? (
          <form className="settings-form__form-group" onSubmit={savingFullName}>
            <div className='settings-form__settings-box'>
              <label className="settings-form__label-info-title">Full name</label>
              <p className="settings-form__label-info-text">Make sure this matches the name on your government-issued ID.</p>
              <div className="settings-form__name-fields">
                <Input label="First Name" type="text" targetName="firstName" defaultValue={name.split(" ")[0]} requiredInput={true} />
                <Input label="Last Name" type="text" targetName="lastName" defaultValue={name.split(" ")[1]} requiredInput={true} />
              </div>
              <button className="settings-form__save-button">Save</button>
            </div>

            <button className="settings-form__cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        ) : (
          <div className={(blockForm) ? "settings-form__form-group--blocked" : "settings-form__form-group"}>
            <div className='settings-form__settings-box'>
              <label className="settings-form__label-info-title">Full name</label>
              <p className="settings-form__label-info-text">{userInfo?.name}</p>
            </div>

            <button className={(blockForm) ? "settings-form__show-button--blocked" : "settings-form__show-button"} onClick={() => setShowForm(true)}>Edit</button>
          </div>
        )}
    </div>
  )
}

export default NameForm