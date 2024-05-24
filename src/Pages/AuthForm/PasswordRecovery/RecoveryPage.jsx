import { React, useState, useEffect } from 'react';
import '../AuthForm.css'
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useRecovery from '../../../hooks/useRecovery';
import { sendEmail } from '../../../Services/user';
import Loading from '../../Structure/LoadingPage';

const validateEmail = (email) => {
  const email_regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  return email_regex.test(email.toLowerCase());
};

const RecoveryPage = () => {
  const { recoveryState, setRecoveryState } = useRecovery();

  const [email, setEmail] = useState(recoveryState?.email);
  const [invalidEmail, setInvalidEmail] = useState(!validateEmail(email));

  const handleButton = () => {
    if (invalidEmail) {
      return <button className="auth-button error" type="submit" disabled>Reset Password</button>
    } else {
      return <button className="auth-button" type="submit" >Reset Password</button>
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    setInvalidEmail(!validateEmail(email))
    handleButton();
  }

  const handleSubmit = async (e) => {    
    e.preventDefault();
    sendEmail(email, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    return <Loading type="page" hook={setRecoveryState} page="alert" items={{email:recoveryState?.email}}/>
  }

  return (
    <div>
      <div className="wrapper">
        <form className={invalidEmail ? 'auth-form error' : "auth-form"} onSubmit={handleSubmit}>
          <h1>Enter your email to reset password</h1>
          <div className="input-box">
            <input 
              className="auth-input"
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>

          {handleButton()}
          <div className="return">
            <button onClick={() => {setRecoveryState({page:"login",email})}}>Cancel</button>
          </div>
          
          
        </form>
      </div>
    </div>
  )
}

export default RecoveryPage;