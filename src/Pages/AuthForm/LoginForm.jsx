import React, { useState } from 'react';
import './AuthForm.scss'
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { login } from '../../Services/auth.js';
import useAuth from '../../hooks/useAuth.js';
import useRecovery from '../../hooks/useRecovery.js';

function LoginForm({ destination }) {
  const { setAuth } = useAuth();
  const { recoveryState, setRecoveryState } = useRecovery();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.destination || "/";
  if (!destination) destination = from;

  const [email, setEmail] = useState(recoveryState?.email);
  const [pwd, setPwd] = useState('');

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPwd, setInvalidPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || authenticated) return; // prevent user from spamming login

    try {
      setInvalidEmail(false);
      setInvalidPwd(false);
      setAuthenticated(false);
      setLoading(true);
      let response = await login(email, pwd);
      let accessToken = response.access_token;
      let accessTokenDecoded = jwtDecode(accessToken); // decode access token

      setLoading(false); // indicate to user, we are processing login request
      setAuthenticated(true);

      setAuth({ access_token: accessToken, user_info: accessTokenDecoded?.UserInfo });
      navigate(destination, { replace: true });

      // delete all info related to access token
      response = null;
      accessToken = null;
      accessTokenDecoded = null;
    } catch (e) {
      console.error("An error occurred:", e);
      setLoading(false);
      if (e.message === "Email not found") { // if given credentials don't match any in the database
        setInvalidEmail(true);
        setPwd('');
      }
      if (e.message === "Incorrect Password") { // if given credentials don't match the one in the system
        setInvalidEmail(false);
        setInvalidPwd(true);
        setPwd('');
      }
    }
  }

  return (
    <div className="auth-box">
      <form className='"auth-box__auth-form' onSubmit={handleSubmit}>
        <h1 className="auth-box__title">Login</h1>
        {
          (invalidEmail) // if user gives an invalid email
            ? <p className="auth-box__auth-msg auth-box__auth-msg--error auth-box__auth-msg--top">No associated account with that email, sign up <Link className={"auth-box__login-link"} to="/signup">here</Link>.</p>
            : (invalidPwd) // if user gives wrong password, but correct email
              ? <p className="auth-box__auth-msg auth-box__auth-msg--error auth-box__auth-msg--top">That email and password combination is incorrect.</p>
              : (loading) // processing request
                ? <p className="auth-box__auth-msg auth-box__auth-msg--loading auth-box__auth-msg--top">Loading...</p>
                : (authenticated)
                ? <p className="auth-box__auth-msg auth-box__auth-msg--success auth-box__auth-msg--top">Authenticated.</p>
                : (null)
        }
        <div className="auth-box__input-box">
          <input
            className={(invalidEmail || invalidPwd) ? "auth-box__auth-input auth-box__auth-input--error" : "auth-box__auth-input"}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <IoMdMail className="auth-box__icon" />
        </div>
        <div className="auth-box__input-box">
          <input
            className={invalidPwd ? "auth-box__auth-input auth-box__auth-input--error" : "auth-box__auth-input"}
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <FaLock className="auth-box__icon" />
        </div>

        <div className="auth-box__forgot-password-container">
          <button
            className="auth-box__forgot-password-button"
            type="button"
            onClick={() => { setRecoveryState({ page: "recover", email: email }) }}
          >
            Forgot Password?
          </button>
        </div>

        <button className="auth-box__auth-button" type="submit" disabled={loading || authenticated}>Login</button>
      </form>
      <div className="auth-box__register-link-container">
        <p>Don't have an account?&nbsp;
          <Link to="/signup">
            <button className="auth-box__register-link-button">Register</button>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm;