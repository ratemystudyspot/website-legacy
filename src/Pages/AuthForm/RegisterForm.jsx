import { React, useState } from 'react';
import './AuthForm.scss'
import { IoMdMail } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa";
import { register } from '../../Services/auth.js';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [invalidName, setInvalidName] = useState(false);

  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [invalidPwd, setInvalidPwd] = useState(false);

  const [duplicate, setDuplicate] = useState(false);

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault(); // if password doesn't meet the requirements, dont refresh page (prevents states resetting)
    try {
      await register(name, email, pwd);
      // if no error thrown get rid of errors and goto email verification page
      setInvalidEmail(false);
      setInvalidPwd(false);
      setDuplicate(false);

      navigate("/login");
      // TODO: navigate to a verify page (for future !!!)
      // navigate("/verify/" + email);
    } catch (e) {
      if (e.message === "Name error") { // if user sends an invalid name 
        setInvalidName(true);
        setInvalidEmail(false);
        setInvalidPwd(false);
        setDuplicate(false);
        setPwd('');
      }
      if (e.message === "Email error") { // if register throws an email error
        setInvalidName(false);
        setInvalidEmail(true);
        setInvalidPwd(false);
        setDuplicate(false);
        setPwd('');
      } else if (e.message === 'Email duplicate Error') { // if register throws a duplicate email error
        setInvalidName(false);
        setInvalidEmail(false);
        setInvalidPwd(false);
        setDuplicate(true);
        setPwd('');
      } else if (e.message === 'Password error') { // if register throws a password error
        setInvalidName(false);
        setInvalidPwd(true);
        setInvalidEmail(false);
        setDuplicate(false);
        setPwd('');
      } else { // if register throws an unexpected error
        console.error("An error occurred:", e);
      }
    }
  }

  return (
    <div className="auth-box">
      <form className="auth-box__auth-form" onSubmit={HandleSubmit}>
        <h1 className="auth-box__title">Register</h1>
        {duplicate && (<p className="auth-box__auth-error-msg auth-box__auth-error-msg--top">Email address already in use, please log in.</p>)}

        <div className="auth-box__input-box">
          <input
            className={invalidName ? "auth-box__auth-input auth-box__auth-input--error" : "auth-box__auth-input"}
            type="text"
            placeholder="Full Name"
            autoComplete='off'
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FaUser className="auth-box__icon" />
          {invalidName && (<p className="auth-box__auth-error-msg bottom">Hmm, that name looks wrong, please enter your full name.</p>)}
        </div>

        <div className="auth-box__input-box">
          <input
            className={(invalidEmail || duplicate) ? "auth-box__auth-input auth-box__auth-input--error" : "auth-box__auth-input"}
            type="email"
            placeholder="Email"
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <IoMdMail className="auth-box__icon" />
          {invalidEmail && (<p className="auth-box__auth-error-msg bottom">Hmm, that email address doesn't look right.</p>)}

        </div>

        <div className="auth-box__input-box">
          <input
            className={invalidPwd ? "auth-box__auth-input auth-box__auth-input--error" : "auth-box__auth-input"}
            type="password"
            placeholder="Password"
            autoComplete='off'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          <FaLock className="auth-box__icon" />
          {invalidPwd && (<p className="auth-box__auth-error-msg">Please set a password longer than eight characters.</p>)}
        </div>

        <button className="auth-box__auth-button" type="submit" >
          Create Account
        </button>

      </form>
      <div className="auth-box__register-link-container">
        <p>Already have an account?&nbsp;
          <Link to="/login">
            <button className="auth-box__register-link-button">Log in</button>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm