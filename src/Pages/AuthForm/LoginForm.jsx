import { React, useState, } from 'react';
import './AuthForm.css'
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LogoComponent from '../../Components/LogoComponent.jsx';
import { getUser, createUser, checkCredentials } from '../../Services/userService.js';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPwd, setInvalidPwd] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await checkCredentials(email, pwd);
      
      setInvalidEmail(false);
      setInvalidPwd(false);
    } catch (e) {
      if (e.message === "Email not found in system") { // if given credentials don't match any in the database
        setInvalidEmail(true);
      } else if (e.message === "Incorrect Password") { // if given credentials don't match the one in the system
        setInvalidEmail(false);
        setInvalidPwd(true);
      }
      else { // unexpected error
        console.error("An error occurred:", e);
      }
    }
  }
  return (
    <div>
      <div className="wrapper">
        <form className='auth-form' onSubmit={HandleSubmit}>
          <h1>Login</h1>
          {invalidEmail ? ( 
            <p className="auth-error-msg login">No associated account with that email, sign up <Link className={"link login"} to="/signup">here</Link>.</p>
          ) : (invalidPwd ? (
            <p className="auth-error-msg login">That email and password combination is incorrect.</p>
          ) : (null))}
          <div className="input-box">
            <input 
              className="auth-input" 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input 
              className="auth-input" 
              type="password" 
              placeholder="Password" 
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required 
            />
            <FaLock className="icon" />
          </div>

          <div className='forgot-password'>
            <a href="#">Forgot Password?</a>
          </div>

          <button className="auth-button" type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account?&nbsp;
            <Link to="/signup">
              <button>Register</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;