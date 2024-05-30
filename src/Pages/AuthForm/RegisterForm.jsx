import { React, useState } from 'react';
import './AuthForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { register } from '../../Services/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth.js";

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [invalidPwd, setInvalidPwd] = useState(false);

  const [duplicate, setDuplicate] = useState(false);

  const navigate = useNavigate();  

  const { auth } = useAuth();

  const HandleSubmit = async (e) => {
    e.preventDefault(); // if password doesn't meet the requirements, dont refresh page (prevents states resetting)
    try {
      await register(email, pwd);
      // if no error thrown get rid of errors and goto email verification page
      setInvalidEmail(false);
      setInvalidPwd(false);
      setDuplicate(false);
      
      navigate("/login");
      // navigate to a verify page (for future !!!)
      // navigate("/verify/" + email);
    } catch (e) {
      if (e.message === 'Email error') { // if createUser throws an email error
        setInvalidEmail(true);
        setInvalidPwd(false);
        setDuplicate(false);
        setPwd('');
        console.log("invalid email");
      } else if (e.message === 'Duplicate email error') { // if createUser throws a duplicate email error
        setInvalidEmail(false);
        setInvalidPwd(false);
        setDuplicate(true);
        setPwd('');
        console.log("duplicate email")
      } else if (e.message === 'Password error') { // if createUser throws a password error
        setInvalidPwd(true);
        setInvalidEmail(false);
        setDuplicate(false);
        setPwd('');
        console.log("invalid pwd");
      } else { // if createUser throws an unexpected error
        console.error("An error occurred:", e);
      }
    }
  }

  return (
    <div>
      <div className="wrapper">
        <form className='auth-form' onSubmit={HandleSubmit}>
          <h1>Register</h1>
          {duplicate && (<p className="auth-error-msg top">Email address already in use, please log in.</p>)}
          <div className="input-box">
            <input
              className={(invalidEmail || duplicate) ? "auth-input error" : "auth-input"}
              type="email"
              placeholder="Email"
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="icon" />
            {invalidEmail && (<p className="auth-error-msg bottom">Hmm, that email address doesn't look right.</p>)}
            
          </div>

          <div className="input-box">
            <input
              className={invalidPwd ? "auth-input error" : "auth-input"}
              type="password"
              placeholder="Password"
              autoComplete='off'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <FaLock className="icon" />
            {invalidPwd && (<p className="auth-error-msg">Please set a password longer than eight characters.</p>)}
          </div>

          <button className="auth-button" type="submit" >
            Create Account
          </button>

        </form>
        <div className="register-link">
          <p>Already have an account?&nbsp;
            <Link to="/login">
              <button>Log in</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm