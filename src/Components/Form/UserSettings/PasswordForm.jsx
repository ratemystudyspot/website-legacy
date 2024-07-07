import React, { useEffect, useState } from 'react'
import './SettingsForms.scss';
import Input from '../../Input/Input';
import useAuth from '../../../hooks/useAuth';
import useRecovery from '../../../hooks/useRecovery';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../Services/user';

function PasswordForm({ userInfo, showForm, setShowForm, blockForm }) {
  const { auth } = useAuth();
  const { setRecoveryState } = useRecovery();
  const navigate = useNavigate();

  const [email, setEmail] = useState(userInfo?.email);

  const [invalidPassword, setInvalidPassword] = useState(true);
  const [justSubmittedForm, setJustSubmittedForm] = useState(false);
  const [savedPassword, setSavedPassword] = useState(false);

  const savingPassword = async (e) => {
    try {
      e.preventDefault();
      setJustSubmittedForm(true); // just submitted the form

      const [currentPassword, newPassword, confirmPassword] = [e.target.oldPassword.value, e.target.newPassword.value, e.target.confirmPassword.value];
      const id = auth?.user_info?.id;

      // check if newPassword and confirmPassword match
      if (newPassword !== confirmPassword) throw new Error("Passwords don't match");

      setInvalidPassword(false);

      // update if currentPassword is correct
      await updateUser({ id, old_password: currentPassword, new_password: newPassword }, auth?.access_token)
      setJustSubmittedForm(false);
      setSavedPassword(true);
    } catch (error) {
      e.preventDefault();
      setInvalidPassword(true);
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
          <form className="settings-form__form-group" onSubmit={savingPassword}>
            <div className='settings-form__settings-box'>
              <label className="settings-form__label-info-title">Password</label>
              <p className="settings-form__label-info-text">This is the password you will use to login with.</p>
              <div className="settings-form__password-fields">
                <Input label="Current Password" type="password" targetName="oldPassword" requiredInput={true} />
                <button
                  className="settings-form__forget-password-button"
                  onClick={() => {
                    setRecoveryState({ page: "recover", email: email });
                    navigate('/login', { state: { from_not_login: true } });
                  }}>
                  Forgot Password?
                </button>
                <Input label="New Password" type="password" targetName="newPassword" requiredInput={true} />
                <Input label="Confirm Password" type="password" targetName="confirmPassword" requiredInput={true} />
              </div>
              <button className="settings-form__save-button">Save</button>
              {
                (invalidPassword && justSubmittedForm)
                  ? <p className='settings-form__request-label'>Request failed, please try again.</p> // if user has submitted but api returns error
                  : (justSubmittedForm)
                    ? <p className='settings-form__request-label'>Loading...</p> // if user has submitted, but waiting for api
                    : (savedPassword)
                      ? <p className='settings-form__request-label'>Saved!</p> // if user has subitted, and successfully saves
                      : (null) // if user has not done anything yet
              }
            </div>

            <button
              className="settings-form__cancel-button"
              onClick={() => { // close form and reset request label states 
                setShowForm(false);
                setInvalidPassword(true);
                setJustSubmittedForm(false);
                setSavedPassword(false);
              }}>
              Cancel
            </button>
          </form>
        ) : (
          <div className={(blockForm) ? "settings-form__form-group--blocked" : "settings-form__form-group"}>
            <div className='settings-form__settings-box'>
              <label className="settings-form__label-info-title">Password</label>
              <p className="settings-form__label-info-text">********</p>
            </div>

            <button className={(blockForm) ? "settings-form__show-button--blocked" : "settings-form__show-button"} onClick={() => setShowForm(true)}>Edit</button>
          </div>
        )}
    </div>
  )
}

export default PasswordForm