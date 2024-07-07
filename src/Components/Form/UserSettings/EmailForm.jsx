import React, { useEffect, useState } from 'react'
import './SettingsForms.scss';
import Input from '../../Input/Input';
import useAuth from '../../../hooks/useAuth';
import { updateUser } from '../../../Services/user';

function EmailForm({ userInfo, showForm, setShowForm, blockForm }) {
  const { auth } = useAuth();
  const [email, setEmail] = useState(userInfo?.email);

  const savingEmail = async (e) => {
    try {
      const inputEmail = e.target.email.value;
      const id = auth?.user_info?.id;
      setEmail(inputEmail);

      await updateUser({ id, email: inputEmail }, auth?.access_token);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setEmail(userInfo?.email);
  }, [userInfo])

  return (
    <div className="settings-form">
      {(showForm)
        ? (
          <form className="settings-form__form-group" onSubmit={savingEmail}>
            <div className='settings-form__settings-box'>
              <label className="settings-form__label-info-title">Email address</label>
              <p className="settings-form__label-info-text">Use an email address you'll always have access to.</p>
              <div className="settings-form__email-fields">
                <Input label="Email Address" type="email" targetName="email" defaultValue={email} requiredInput={true} />
              </div>
              <button className="settings-form__save-button">Save</button>
            </div>

            <button className="settings-form__cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        ) : (
          <div className={(blockForm) ? "settings-form__form-group--blocked" : "settings-form__form-group"}>
            <div className='settings-form__settings-box'>
              <label className="settings-form__label-info-title">Email address</label>
              <p className="settings-form__label-info-text">{userInfo?.email}</p>
            </div>

            <button className={(blockForm) ? "settings-form__show-button--blocked" : "settings-form__show-button"} onClick={() => setShowForm(true)}>Edit</button>
          </div>
        )}
    </div>
  )
}

export default EmailForm