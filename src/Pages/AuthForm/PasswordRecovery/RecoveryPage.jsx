import { React, useState, useEffect } from 'react';
import '../AuthForm.scss'
import { FaUser } from "react-icons/fa";
import useRecovery from '../../../hooks/useRecovery';
import Loading from '../../Structure/LoadingPage';
import { sendRecoveryEmail } from '../../../Services/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const RecoveryPage = () => {
  const { recoveryState, setRecoveryState } = useRecovery();

  const navigate = useNavigate();
  const state = useLocation();

  const validateEmail = (email) => {
    const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i
    return email_regex.test(email.toLowerCase());
  };

  const [email, setEmail] = useState(recoveryState?.email);
  const [invalidEmail, setInvalidEmail] = useState(!validateEmail(email));
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail)
    setInvalidEmail(!validateEmail(newEmail))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRecoveryEmail(email);
      setLoading(true);
    } catch (error) {
      console.log("Error:", error)
    }

  }

  return (
    <>
      {
        loading ? (
          <Loading type="page" hook={setRecoveryState} to="alert" items={{ ...recoveryState, email: email }} /> // change recoveryState here instead of at handleSubmit b/c of ???
        ) : (
          <div className="auth-box">
            <form className={invalidEmail ? 'auth-box__auth-form error' : "auth-box__auth-form"} onSubmit={handleSubmit}>
              <h1 className="auth-box__title">Enter your email to reset password</h1>
              <div className="auth-box__input-box">
                <input
                  className="auth-box__auth-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <FaUser className="auth-box__icon" />
              </div>

              <button className={invalidEmail ? 'auth-box__auth-button auth-box__auth-button--error' : 'auth-box__auth-button'} type="submit" disabled={invalidEmail}>
                Reset Password
              </button>

              <div className="auth-box__return-container">
                <button
                  className="auth-box__return-button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (state?.state?.from_not_login) navigate(-1); // go back to previous page if not from login page
                    setRecoveryState(prevState => ({ ...prevState, email, page: "login" }));
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
      }
    </>
  )
}

export default RecoveryPage;